import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DASNotification, NotificationsService } from '@notifications/data-access';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'notifications-feature-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-notifications.component.html',
  styleUrl: './feature-notifications.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureNotificationsComponent {
  private readonly notificationsService = inject(NotificationsService);
  public readonly notification$: Observable<DASNotification | null> = this.notificationsService.notification$.pipe(
    tap(() => console.log('work'))
  );

  public onCloseNotification(): void {
    this.notificationsService.closeNotification();
  }
}
