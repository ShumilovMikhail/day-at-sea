import { ResponseError } from '@http';
import { EntityState } from '@ngrx/entity';
import { BookingEntity } from './bookings.models';

export interface BookingsState extends EntityState<BookingEntity> {
  status: BookingsStateStatus;
  error: ResponseError | null;
  isLoaded: boolean;
}

export type BookingsStateStatus = 'init' | 'loading' | 'loaded' | 'error';
