import { StaffMemberDTO, StaffMemberEntity } from '../types/staff.models';

export interface StaffDTOAdapter {
  DTOToEntity: (staff: StaffMemberDTO) => StaffMemberEntity;
  entityToDTO: (staff: StaffMemberEntity) => StaffMemberDTO;
}

export const staffDTOAdapter: StaffDTOAdapter = {
  DTOToEntity: (staff: StaffMemberDTO): StaffMemberEntity => ({
    id: staff.id,
    name: staff.name,
    email: staff.email,
    agencyObjectsId: staff.agency_objects_id,
    role: staff.role,
    status: staff.status,
    agenciesId: staff.agencies_id,
    createdAt: staff.created_at,
  }),
  entityToDTO: (staff: StaffMemberEntity): StaffMemberDTO => ({
    id: staff.id,
    name: staff.name,
    email: staff.email,
    agency_objects_id: staff.agencyObjectsId,
    role: staff.role,
    status: staff.status,
    agencies_id: staff.agenciesId,
    created_at: staff.createdAt,
  }),
};
