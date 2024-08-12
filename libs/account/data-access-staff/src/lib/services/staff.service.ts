import { inject, Injectable } from '@angular/core';
import { ApiService } from '@http';
import { AddStaffMemberRequest, StaffDTO, StaffMemberDTO } from '../types/staff.models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StaffService {
  private readonly apiService = inject(ApiService);

  public getStaff(agencyId: number): Observable<StaffDTO> {
    const url = this.getUrl(agencyId);
    return this.apiService.get<StaffDTO>(url);
  }

  public updateStaffMember(agencyId: number, staffMember: StaffMemberDTO): Observable<StaffMemberDTO> {
    const url = this.getUrl(agencyId);
    return this.apiService.put<StaffMemberDTO>(url + `/${staffMember.id}`, staffMember);
  }

  public addStaffMember(agencyId: number, staffMember: AddStaffMemberRequest): Observable<StaffMemberDTO> {
    const url = this.getUrl(agencyId);
    return this.apiService.post<StaffMemberDTO>(url, staffMember);
  }

  private getUrl(agencyId: number): string {
    return `agencies/${agencyId}/staff`;
  }
}
