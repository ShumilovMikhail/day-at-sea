import { computed, inject, Injectable, Signal } from '@angular/core';
import { catchError, map, Observable, of, take } from 'rxjs';
import { patchState, signalStore, withState } from '@ngrx/signals';
import { addEntity, removeEntity, setEntities, updateEntity, withEntities } from '@ngrx/signals/entities';

import { StaffState } from '../types/staff-state.models';
import { StaffService } from './staff.service';
import { ResponseError } from '@http';
import { AddStaffMemberRequest, StaffDTO, StaffEntity, StaffMemberDTO, StaffMemberEntity } from '../types/staff.models';
import { staffDTOAdapter } from './staff-dto.adapter';

const initialState: StaffState = {
  isLoading: false,
  error: null,
  status: 'init',
};

@Injectable({ providedIn: 'root' })
export class StaffStore extends signalStore(
  { protectedState: false },
  withState(initialState),
  withEntities<StaffMemberEntity>()
) {
  private readonly staffService = inject(StaffService);

  public staff$: Signal<StaffEntity | null> = computed(() => (this.status() === 'loaded' ? this.entities() : null));

  public getStaff(agencyId: number): void {
    patchState(this, {
      isLoading: true,
      status: 'loading',
    });
    this.staffService
      .getStaff(agencyId)
      .pipe(
        map((staff: StaffDTO): StaffEntity => {
          return staff.map((staffMember: StaffMemberDTO) => staffDTOAdapter.DTOToEntity(staffMember));
        }),
        catchError((response: ResponseError): Observable<null> => {
          patchState(this, { error: response });
          return of(null);
        }),
        take(1)
      )
      .subscribe((staff: StaffEntity | null) => {
        if (staff) patchState(this, setEntities(staff));
        patchState(this, { isLoading: false, status: 'loaded' });
      });
  }

  public updateStaffMember(agencyId: number, staffMember: StaffMemberEntity): void {
    patchState(this, {
      isLoading: true,
    });
    const staffMemberDTO = staffDTOAdapter.entityToDTO(staffMember, agencyId);
    this.staffService
      .updateStaffMember(agencyId, staffMemberDTO)
      .pipe(
        map((staffMember: StaffMemberDTO): StaffMemberEntity => {
          return staffDTOAdapter.DTOToEntity(staffMember);
        }),
        catchError((response: ResponseError): Observable<null> => {
          patchState(this, { error: response });
          return of(null);
        }),
        take(1)
      )
      .subscribe((staffMember: StaffMemberEntity | null) => {
        if (staffMember) patchState(this, updateEntity({ id: staffMember.id, changes: staffMember }));
        patchState(this, { isLoading: false });
      });
  }

  public deleteStaffMember(agencyId: number, staffMemberId: number): void {
    patchState(this, {
      isLoading: true,
    });
    this.staffService
      .deleteStaffMember(agencyId, staffMemberId)
      .pipe(
        map((): boolean => {
          return true;
        }),
        catchError((response: ResponseError): Observable<boolean> => {
          patchState(this, { error: response });
          return of(false);
        }),
        take(1)
      )
      .subscribe((isDeleted: boolean) => {
        if (isDeleted) patchState(this, removeEntity(staffMemberId));
        patchState(this, { isLoading: false });
      });
  }

  public addStaffMember(agencyId: number, staffMember: AddStaffMemberRequest): void {
    patchState(this, { isLoading: true });
    this.staffService
      .addStaffMember(agencyId, staffMember)
      .pipe(
        map((staffMember: StaffMemberDTO): StaffMemberEntity => {
          return staffDTOAdapter.DTOToEntity(staffMember);
        }),
        catchError((response: ResponseError): Observable<null> => {
          patchState(this, { error: response });
          return of(null);
        }),
        take(1)
      )
      .subscribe((staffMember: StaffMemberEntity | null) => {
        if (staffMember) patchState(this, addEntity(staffMember));
        patchState(this, { isLoading: false });
      });
  }
}
