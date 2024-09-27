import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { MoveEntity } from '../types/moving.models';

const mockMoving: MoveEntity[] = [
  {
    id: 1,
    bookingId: 13,
    type: 'arrival',
    date: '12.02.2023',
    objectId: 3,
    guestCount: 2,
    amount: 2700,
  },
  {
    id: 2,
    bookingId: 13,
    type: 'departure',
    date: '12.02.2023',
    objectId: 3,
    guestCount: 2,
    amount: 2700,
  },
];

@Injectable({ providedIn: 'root' })
export class MoveService {
  private readonly movingSubject: BehaviorSubject<MoveEntity[] | null> = new BehaviorSubject<MoveEntity[] | null>(null);
  public readonly moving$: Observable<MoveEntity[]> = this.movingSubject.pipe(
    filter((moving: MoveEntity[] | null): moving is MoveEntity[] => Boolean(moving))
  );

  public initMoving(): void {
    this.movingSubject.next(mockMoving);
  }
}
