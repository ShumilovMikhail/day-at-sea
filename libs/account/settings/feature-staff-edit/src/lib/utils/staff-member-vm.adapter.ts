import { StaffMemberEntity } from '@account/staff/data-access-staff';
import { StaffMemberVM } from '../types/staff-vm.models';

export const staffMemberVMAdapter = {
  entityToVM: (staffMember: StaffMemberEntity): StaffMemberVM => {
    return {
      id: staffMember.id,
      name: staffMember.name,
      email: staffMember.email,
      role: staffMember.role,
      status: staffMember.status,
    };
  },
};
