import { createActionGroup, props } from '@ngrx/store';

import { ResponseError } from '@http';
import { AgencyEntity } from '../types/agency.models';

export const agencyActions = createActionGroup({
  source: 'Agency',
  events: {
    init: props<{ userId: number }>(),
    getAgency: props<{ userId: number }>(),

    getAgencySuccess: props<{ agency: AgencyEntity }>(),

    getAgencyFailure: props<{ error: ResponseError }>(),
  },
});
