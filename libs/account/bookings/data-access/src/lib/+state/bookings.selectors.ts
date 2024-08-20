import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BookingsState, BookingsStateStatus } from '../types/bookings-state.models';
import { bookingsAdapter, bookingsFeature } from './bookings.reducer';

// Lookup the 'Bookings' feature state managed by NgRx
export const selectBookingsState = createFeatureSelector<BookingsState>(bookingsFeature.name);

export const BookingsEntitiesSelectors = bookingsAdapter.getSelectors();

export const selectBookingsStatus = createSelector(selectBookingsState, (state: BookingsState) => state.status);

export const selectBookingsLoaded = createSelector(selectBookingsState, (state: BookingsState) => state.isLoaded);

export const selectBookingsError = createSelector(selectBookingsState, (state: BookingsState) => state.error);

export const selectBookingsLoading = createSelector(
  selectBookingsStatus,
  (bookingsStatus: BookingsStateStatus) => bookingsStatus === 'loading'
);

export const selectBookings = createSelector(selectBookingsState, (state: BookingsState) =>
  BookingsEntitiesSelectors.selectAll(state)
);
