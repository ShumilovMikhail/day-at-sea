import { ResponseError } from '@http';
import { EntityState } from '@ngrx/entity';
import { BookingHistoryItemEntity, ClientEntity } from './clients.models';

export interface ClientsState extends EntityState<ClientEntity> {
  status: ClientsStateStatus;
  error: ResponseError | null;
  isLoaded: boolean;
}

export type ClientsStateStatus = 'init' | 'loading' | 'loaded' | 'error';
