import { patchState, signalStore, withState } from '@ngrx/signals';
import { StaffState } from '../types/staff-state.models';
import { inject } from '@angular/core';
import { StaffService } from './staff.service';
import { catchError, map, Observable, of, take } from 'rxjs';
import { ResponseError } from '@http';
import { StaffDTO, StaffEntity, StaffMemberDTO, StaffMemberEntity } from '../types/staff.models';
import { staffDTOAdapter } from './staff-dto.adapter';
import { setEntities, updateEntity, withEntities } from '@ngrx/signals/entities';

const initialState: StaffState = {
  isLoading: false,
  error: null,
};

export class StaffStore extends signalStore(
  { protectedState: false },
  withState(initialState),
  withEntities<StaffMemberEntity>()
) {
  private readonly staffService = inject(StaffService);

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
      .subscribe((staff: StaffEntity | null) =>
        staff
          ? patchState(
              this,
              {
                isLoading: false,
              },
              setEntities(staff)
            )
          : patchState(this, { isLoading: false })
      );
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
