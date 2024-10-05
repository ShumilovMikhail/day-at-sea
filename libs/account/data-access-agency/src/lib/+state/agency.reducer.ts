import { createReducer, on, createFeature } from '@ngrx/store';

import { AgencyState, SalesChannelRequestDTO } from '../types/agency-state.models';
import { agencyActions } from './agency.actions';
import {
  AgencyEntity,
  AgencyRequisitesEntity,
  Contacts,
  AgencyRulesDTO,
  AgencyRulesEntity,
  SalesChannelDTO,
  SalesChannelEntity,
  UpdateRequisitesRequestDTO,
} from '../types/agency.models';
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
      (state: AgencyState, payload: { id: number; contacts: Contacts }): AgencyState => ({
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
    ),

    on(
      agencyActions.updateAgencyRules,
      (state: AgencyState, payload: { id: number; rules: AgencyRulesDTO }): AgencyState => ({
        ...state,
        status: 'loading',
        error: null,
      })
    ),
    on(
      agencyActions.updateAgencyRulesSuccess,
      (state: AgencyState, payload: { rules: AgencyRulesEntity }): AgencyState => ({
        ...state,
        status: 'loaded',
        agency: {
          ...state.agency,
          rules: payload.rules,
        } as AgencyEntity,
      })
    ),
    on(
      agencyActions.updateAgencyRulesFailure,
      (state: AgencyState, payload: { error: ResponseError }): AgencyState => ({
        ...state,
        status: 'error',
        error: payload.error,
      })
    ),

    on(
      agencyActions.updateAgencyRequisites,
      (state: AgencyState, payload: { id: number; requisites: UpdateRequisitesRequestDTO }): AgencyState => ({
        ...state,
        status: 'loading',
        error: null,
      })
    ),
    on(
      agencyActions.updateAgencyRequisitesSuccess,
      (state: AgencyState, payload: { requisites: AgencyRequisitesEntity }): AgencyState => ({
        ...state,
        status: 'loaded',
        agency: {
          ...state.agency,
          ...payload.requisites,
        } as AgencyEntity,
      })
    ),
    on(
      agencyActions.updateAgencyRequisitesFailure,
      (state: AgencyState, payload: { error: ResponseError }): AgencyState => ({
        ...state,
        status: 'error',
        error: payload.error,
      })
    ),

    on(
      agencyActions.addAgencySalesChannel,
      (state: AgencyState, payload: { id: number; salesChannel: SalesChannelRequestDTO }): AgencyState => ({
        ...state,
        status: 'loading',
        error: null,
      })
    ),
    on(
      agencyActions.addAgencySalesChannelSuccess,
      (state: AgencyState, payload: { salesChannel: SalesChannelEntity }): AgencyState => ({
        ...state,
        status: 'loaded',
        agency: {
          ...state.agency,
          salesChannels: [...state.agency!.salesChannels, payload.salesChannel],
        } as AgencyEntity,
      })
    ),
    on(
      agencyActions.addAgencySalesChannelFailure,
      (state: AgencyState, payload: { error: ResponseError }): AgencyState => ({
        ...state,
        status: 'error',
        error: payload.error,
      })
    ),

    on(
      agencyActions.updateAgencySalesChannel,
      (state: AgencyState, payload: { id: number; salesChannel: SalesChannelDTO }): AgencyState => ({
        ...state,
        status: 'loading',
        error: null,
      })
    ),
    on(
      agencyActions.updateAgencySalesChannelSuccess,
      (state: AgencyState, payload: { salesChannel: SalesChannelEntity }): AgencyState => ({
        ...state,
        status: 'loaded',
        agency: {
          ...state.agency,
          salesChannels: [
            ...state.agency!.salesChannels.map((salesChannel: SalesChannelEntity) =>
              salesChannel.id === payload.salesChannel.id ? payload.salesChannel : salesChannel
            ),
          ],
        } as AgencyEntity,
      })
    ),
    on(
      agencyActions.updateAgencySalesChannelFailure,
      (state: AgencyState, payload: { error: ResponseError }): AgencyState => ({
        ...state,
        status: 'error',
        error: payload.error,
      })
    ),

    on(
      agencyActions.deleteAgencySalesChannel,
      (state: AgencyState, payload: { id: number; salesChannelId: number }): AgencyState => ({
        ...state,
        status: 'loading',
        error: null,
      })
    ),
    on(
      agencyActions.deleteAgencySalesChannelSuccess,
      (state: AgencyState, payload: { id: number }): AgencyState => ({
        ...state,
        status: 'loaded',
        agency: {
          ...state.agency,
          salesChannels: [...state.agency!.salesChannels].filter(
            (salesChannel: SalesChannelEntity) => salesChannel.id !== payload.id
          ),
        } as AgencyEntity,
      })
    ),
    on(
      agencyActions.deleteAgencySalesChannelFailure,
      (state: AgencyState, payload: { error: ResponseError }): AgencyState => ({
        ...state,
        status: 'error',
        error: payload.error,
      })
    )
  ),
});
