import { AgencyEntity } from './agency.models';
import { ResponseError } from '@http';

export type AgencyStatus = 'init' | 'loading' | 'loaded' | 'error';

export interface AgencyState {
  status: AgencyStatus | null;
  agency: AgencyEntity | null;
  error: ResponseError | null;
}
