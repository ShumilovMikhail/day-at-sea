import { inject, Injectable } from '@angular/core';
import { combineLatestWith, map, Observable, tap } from 'rxjs';

import { BookingEntity, BookingsFacade } from '@account/bookings/data-access';
import { MoveEntity, MoveService } from '@account/move/data-access';
import { MyObjectsFacade, MyObjectsVM } from '@account/my-objects/data-access';
import { MoveVM } from '../types/moving.models';
import { moveEntityAdapter } from '../utils/move-entity.adapter';

@Injectable()
export class MoveVMService {
  private readonly moveService = inject(MoveService);
  private readonly bookingsFacade = inject(BookingsFacade);
  private readonly myObjectsFacade = inject(MyObjectsFacade);
  public readonly movingVM$: Observable<MoveVM[]> = this.moveService.moving$.pipe(
    combineLatestWith(this.bookingsFacade.bookings$, this.myObjectsFacade.myObjectsVM$),
    tap(console.log),
    map(([moving, bookings, myObjects]: [MoveEntity[], BookingEntity[], MyObjectsVM]) =>
      moveEntityAdapter.entityToVM(moving, myObjects, bookings)
    )
  );

  public initMoving(): void {
    this.moveService.initMoving();
  }
}
