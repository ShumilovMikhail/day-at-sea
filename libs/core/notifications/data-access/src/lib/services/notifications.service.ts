import { inject, Injectable } from '@angular/core';

import { DASNotification } from '../types/notifications.models';
import { NOTIFICATION_EXECUTION_TIME } from '../types/notification-execution-time.token';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private readonly executionTime: number = inject(NOTIFICATION_EXECUTION_TIME);
  private readonly notifications: DASNotification[] = [];
  private activeNotification: BehaviorSubject<DASNotification | null> = new BehaviorSubject<DASNotification | null>(
    null
  );
  private activeTimeOutId: number | null = null;
  public notification$: Observable<DASNotification | null> = this.activeNotification.asObservable();

  public send(notification: DASNotification): void {
    this.notifications.push(notification);
    this.activeNotification.pipe(take(1)).subscribe((activeNotification) => {
      if (!activeNotification) this.activateNextNotification();
    });
  }

  public activateNextNotification(): void {
    if (this.notifications.length === 0) return;
    this.activeNotification.next(this.notifications[0]);
    this.activeTimeOutId = setTimeout(() => {
      this.closeNotification();
    }, this.executionTime);
  }

  public closeNotification(): void {
    this.activeNotification.next(null);
    this.notifications.shift();
    if (this.activeTimeOutId) clearTimeout(this.activeTimeOutId);
    this.activateNextNotification();
  }
}
