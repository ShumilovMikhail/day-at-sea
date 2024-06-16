import { createActionGroup, props } from '@ngrx/store';

import { ResponseError } from '@http';
import { AgencyEntity, Contacts } from '../types/agency.models';

export const agencyActions = createActionGroup({
  source: 'Agency',
  events: {
    init: props<{ userId: number }>(),
    getAgency: props<{ userId: number }>(),
    updateAgencyContacts: props<{ id: number; contacts: Contacts }>(),

    getAgencySuccess: props<{ agency: AgencyEntity }>(),
    updateAgencyContactsSuccess: props<{ contacts: Contacts }>(),

    getAgencyFailure: props<{ error: ResponseError }>(),
    updateAgencyContactsFailure: props<{ error: ResponseError }>(),
  },
});
