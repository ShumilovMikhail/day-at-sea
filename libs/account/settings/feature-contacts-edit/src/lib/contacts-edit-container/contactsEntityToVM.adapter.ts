import { Contacts } from '@account/data-access-agency';
import { ContactsVM } from '../types/contacts.models';

export interface ContactsEntityToVM {
  entityToVM: (contactsEntity: Contacts) => ContactsVM;
}

export const contactsEntityToVM: ContactsEntityToVM = {
  entityToVM: (contactsEntity: Contacts): ContactsVM => {
    return {
      phones: contactsEntity.phones ? contactsEntity.phones : [],
      site: contactsEntity.site ? contactsEntity.site : '',
      vk: contactsEntity.vk ? contactsEntity.vk : '',
      ok: contactsEntity.ok ? contactsEntity.ok : '',
      whatsapp: contactsEntity.whatsapp ? contactsEntity.whatsapp : '',
      telegram: contactsEntity.telegram ? contactsEntity.telegram : '',
      viber: contactsEntity.viber ? contactsEntity.viber : '',
    };
  },
};
