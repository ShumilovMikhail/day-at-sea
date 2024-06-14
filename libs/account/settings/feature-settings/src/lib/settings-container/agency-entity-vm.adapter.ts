import { AgencyEntity } from '@account/data-access-agency';
import { AgencyVM } from '../types/settings.models';

export interface AgencyEntityVMAdapter {
  entityToVM: (agency: AgencyEntity | null) => AgencyVM | null;
}

export const agencyEntityVMAdapter: AgencyEntityVMAdapter = {
  entityToVM: (agency: AgencyEntity | null): AgencyVM | null => {
    return agency
      ? {
          ...agency,
          contacts: {
            ...agency.contacts,
            phones: agency.contacts.phones
              ? [...agency.contacts.phones].join(', ')
              : null,
          },
        }
      : null;
  },
};
