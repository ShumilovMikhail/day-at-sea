import { inject, Injectable } from '@angular/core';
import { combineLatestWith, filter, map, Observable, take, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { AgencyFacade } from '@account/data-access-agency';
import { ClientsStateStatus } from '../types/clients-state.models';
import {
  selectClients,
  selectClientsError,
  selectClientsLoaded,
  selectClientsLoading,
  selectClientsStatus,
} from '../+state/clients.selectors';
import { ResponseError } from '@http';
import { ClientEntity } from '../types/clients.models';
import { clientsActions } from '../+state/clients.actions';
import { clientsDTOAdapter } from '../+state/clients-dto.adapter';
import { BookingEntity } from '@account/bookings/data-access';
import { bookingEntityAdapter } from '../+state/booking-entity.adapter';

@Injectable({ providedIn: 'root' })
export class ClientsFacade {
  private readonly store = inject(Store);
  private readonly agencyFacade = inject(AgencyFacade);

  public readonly status$: Observable<ClientsStateStatus | null> = this.store.select(selectClientsStatus);
  public readonly clientsLoaded$: Observable<boolean> = this.store.select(selectClientsLoaded);
  public readonly error$: Observable<ResponseError | null> = this.store.select(selectClientsError);
  public readonly loading$: Observable<boolean> = this.store.select(selectClientsLoading);
  public readonly clients$: Observable<ClientEntity[]> = this.store.select(selectClients).pipe(
    combineLatestWith(this.agencyFacade.id$),
    withLatestFrom(this.clientsLoaded$),
    tap(([args, isLoaded]: [[ClientEntity[], number | null], boolean]) => {
      if (!isLoaded && args[1]) {
        this.store.dispatch(clientsActions.getClients({ agencyId: args[1] }));
      }
    }),
    filter(([args, isLoaded]: [[ClientEntity[], number | null], boolean]) => isLoaded),
    map(([args, isLoaded]: [[ClientEntity[], number | null], boolean]) => {
      return args[0];
    })
  );

  public updateClient(client: ClientEntity): void {
    this.agencyFacade.id$
      .pipe(
        filter((id: number | null): id is number => Boolean(id)),
        take(1)
      )
      .subscribe((agencyId: number) => {
        this.store.dispatch(clientsActions.updateClient({ agencyId, client: clientsDTOAdapter.entityToDTO(client) }));
      });
  }

  public addBooking(id: number, booking: BookingEntity): void {
    this.store.dispatch(
      clientsActions.addBooking({ id, booking: bookingEntityAdapter.entityToBookingHistoryItemEntity(booking) })
    );
  }
}
