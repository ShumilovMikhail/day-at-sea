import { createReducer, on, createFeature } from '@ngrx/store';

import { AgencyState } from '../types/agency-state.models';
import { agencyActions } from './agency.actions';
import { AgencyEntity, Contacts } from '../types/agency.models';
import { ResponseError } from '@http';

export const initialAgencyState: AgencyState = {
  status: null,
  agency: null,
  error: null,
};

export const agencyFeature = createFeature({
  name: 'Agency',
  reducer: createReducer(
    initialAgencyState,
    on(
      agencyActions.init,
      (state: AgencyState, payload: { userId: number }): AgencyState => ({
        ...initialAgencyState,
        status: 'init',
      })
    ),
    on(
      agencyActions.getAgency,
      (state: AgencyState, payload: { userId: number }): AgencyState => ({
        ...state,
        status: 'loading',
        error: null,
      })
    ),
    on(
      agencyActions.getAgencySuccess,
      (state: AgencyState, payload: { agency: AgencyEntity }): AgencyState => ({
        ...state,
        status: 'loaded',
        agency: payload.agency,
      })
    ),
    on(
      agencyActions.getAgencyFailure,
      (state: AgencyState, payload: { error: ResponseError }): AgencyState => ({
        ...state,
        status: 'error',
        error: payload.error,
      })
    ),
    on(
      agencyActions.updateAgencyContacts,
      (
        state: AgencyState,
        payload: { id: number; contacts: Contacts }
      ): AgencyState => ({
        ...state,
        status: 'loading',
        error: null,
      })
    ),
    on(
      agencyActions.updateAgencyContactsSuccess,
      (state: AgencyState, payload: { contacts: Contacts }): AgencyState => ({
        ...state,
        status: 'loaded',
        agency: {
          ...state.agency,
          contacts: payload.contacts,
        } as AgencyEntity,
      })
    ),
    on(
      agencyActions.updateAgencyContactsFailure,
      (state: AgencyState, payload: { error: ResponseError }): AgencyState => ({
        ...state,
        status: 'error',
        error: payload.error,
      })
    )
  ),
});
