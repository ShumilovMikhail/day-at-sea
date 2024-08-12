import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, map, Observable, of, take } from 'rxjs';
import { patchState, signalStore, withState } from '@ngrx/signals';
import { setEntities, updateEntity, withEntities } from '@ngrx/signals/entities';

import { StaffState } from '../types/staff-state.models';
import { StaffService } from './staff.service';
import { ResponseError } from '@http';
import { StaffDTO, StaffEntity, StaffMemberDTO, StaffMemberEntity } from '../types/staff.models';
import { staffDTOAdapter } from './staff-dto.adapter';

const initialState: StaffState = {
  isLoading: false,
  error: null,
};

@Injectable({ providedIn: 'root' })
export class StaffStore extends signalStore(
  { protectedState: false },
  withState(initialState),
  withEntities<StaffMemberEntity>()
) {
  private readonly staffService = inject(StaffService);

  public readonly staff: WritableSignal<StaffEntity | null> = signal(null);

  public getStaff(agencyId: number) {
    patchState(this, {
      isLoading: true,
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
        if (staff) {
          patchState(this, setEntities(staff));
          this.staff.set(staff);
          return;
        }
        patchState(this, { isLoading: false });
      });
  }

  public updateStaffMember(agencyId: number, staffMember: StaffMemberEntity) {
    patchState(this, {
      isLoading: true,
    });
    const staffMemberDTO = staffDTOAdapter.entityToDTO(staffMember);
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
      .subscribe((staffMember: StaffMemberEntity | null) =>
        staffMember
          ? patchState(
              this,
              {
                isLoading: false,
              },
              updateEntity({ id: staffMember.id, changes: staffMember })
            )
          : patchState(this, { isLoading: false })
      );
  }
}
