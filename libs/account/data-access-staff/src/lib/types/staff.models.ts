export type StaffDTO = StaffMemberDTO[];

export interface StaffMemberDTO {
  id: number;
  name: string;
  email: string;
  agency_objects_id: number[];
  role: string;
  status: StaffStatusTypes;
  agencies_id: number;
  created_at: string;
}

export type StaffEntity = StaffMemberEntity[];

export interface StaffMemberEntity {
  id: number;
  name: string;
  email: string;
  agencyObjectsId: number[];
  role: string;
  status: StaffStatusTypes;
  createdAt: string;
}

export interface AddStaffMemberRequest {
  name: string;
  email: string;
  role: string;
  status: StaffStatusTypes;
}

export enum StaffStatusTypes {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}
