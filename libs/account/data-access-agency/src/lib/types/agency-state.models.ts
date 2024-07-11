import { AgencyEntity, SalesChannelDTO, SalesChannelEntity } from './agency.models';
import { ResponseError } from '@http';

export type AgencyStatus = 'init' | 'loading' | 'loaded' | 'error';

export interface AgencyState {
  status: AgencyStatus | null;
  agency: AgencyEntity | null;
  error: ResponseError | null;
}

export type SalesChannelRequestDTO = Omit<SalesChannelDTO, 'id'>;
export type SalesChannelRequestEntity = Omit<SalesChannelEntity, 'id'>;
