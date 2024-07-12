import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { filter, Observable } from 'rxjs';

import { AgencyFacade, SalesChannelEntity } from '@account/data-access-agency';
import { SalesChannelsVM } from '../../types/sales-channels.models';
import { SalesChannelsTableUiComponent } from '../sales-channels-table-ui/sales-channels-table-ui.component';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';

@Component({
  selector: 'account-sales-channels-container',
  standalone: true,
  imports: [CommonModule, SalesChannelsTableUiComponent, UiIndicatorsLoaderComponent],
  templateUrl: './sales-channels-container.component.html',
  styleUrl: './sales-channels-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesChannelsContainerComponent {
  private readonly agencyFacade = inject(AgencyFacade);
  public readonly salesChannels$: Observable<SalesChannelsVM[]> = this.agencyFacade.salesChannels$.pipe(
    filter((salesChannels: SalesChannelEntity[] | null): salesChannels is SalesChannelEntity[] =>
      Boolean(salesChannels)
    )
  );

  constructor(title: Title) {
    title.setTitle('Каналы продаж');
  }
}
