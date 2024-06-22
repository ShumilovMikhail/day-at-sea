import { createActionGroup, props } from '@ngrx/store';

import { ResponseError } from '@http';
import { AgencyEntity, AgencyRequisitesEntity, Contacts, UpdateRequisitesRequestDTO } from '../types/agency.models';

export const agencyActions = createActionGroup({
  source: 'Agency',
  events: {
    init: props<{ userId: number }>(),
    getAgency: props<{ userId: number }>(),
    updateAgencyContacts: props<{ id: number; contacts: Contacts }>(),
    updateAgencyRequisites: props<{ id: number; requisites: UpdateRequisitesRequestDTO }>(),

    getAgencySuccess: props<{ agency: AgencyEntity }>(),
    updateAgencyContactsSuccess: props<{ contacts: Contacts }>(),
    updateAgencyRequisitesSuccess: props<{ requisites: AgencyRequisitesEntity }>(),

    getAgencyFailure: props<{ error: ResponseError }>(),
    updateAgencyContactsFailure: props<{ error: ResponseError }>(),
    updateAgencyRequisitesFailure: props<{ error: ResponseError }>(),
  },
});
