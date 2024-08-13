import { StaffMemberDTO, StaffMemberEntity } from '../types/staff.models';

export interface StaffDTOAdapter {
  DTOToEntity: (staff: StaffMemberDTO) => StaffMemberEntity;
  entityToDTO: (staff: StaffMemberEntity, agencyId: number) => StaffMemberDTO;
}

export const staffDTOAdapter: StaffDTOAdapter = {
  DTOToEntity: (staff: StaffMemberDTO): StaffMemberEntity => ({
    id: staff.id,
    name: staff.name,
    email: staff.email,
    role: staff.role,
    status: staff.status,
    createdAt: staff.created_at,
  }),
  entityToDTO: (staff: StaffMemberEntity, agencyId: number): StaffMemberDTO => ({
    id: staff.id,
    name: staff.name,
    email: staff.email,
    role: staff.role,
    status: staff.status,
    agencies_id: agencyId,
    created_at: staff.createdAt,
  }),
};
