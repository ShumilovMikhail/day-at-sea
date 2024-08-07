import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, Observable, Subscription, tap } from 'rxjs';

import { AgencyFacade, SalesChannelEntity } from '@account/data-access-agency';
import { ChannelStatusVMType, SalesChannelVM } from '../../types/sales-channels.models';
import { SalesChannelsTableUiComponent } from '../sales-channels-table-ui/sales-channels-table-ui.component';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';
import { isNotNumberValidator } from '@utils/validators';
import { SalesChannelsUpdateUiComponent } from '../sales-channels-update-ui/sales-channels-update-ui.component';
import { UpdateChannelForm } from '../../types/update-channel-form.models';
import { SalesChannelsAddModalContainerComponent } from '@account/sales-channels/feature-sales-channels-add-modal';

@Component({
  selector: 'account-sales-channels-container',
  standalone: true,
  imports: [
    CommonModule,
    SalesChannelsTableUiComponent,
    UiIndicatorsLoaderComponent,
    SalesChannelsUpdateUiComponent,
    SalesChannelsAddModalContainerComponent,
  ],
  templateUrl: './sales-channels-container.component.html',
  styleUrl: './sales-channels-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesChannelsContainerComponent {
  private readonly agencyFacade = inject(AgencyFacade);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  public readonly salesChannels$: Observable<SalesChannelVM[]> = this.agencyFacade.salesChannels$.pipe(
    filter((salesChannels: SalesChannelEntity[] | null): salesChannels is SalesChannelEntity[] =>
      Boolean(salesChannels)
    )
  );
  public readonly updateForm: FormGroup<UpdateChannelForm> = this.fb.nonNullable.group({
    id: [0],
    channel: ['', [Validators.required]],
    title: ['', [Validators.required]],
    accountId: ['', [Validators.required, isNotNumberValidator()]],
    status: [''],
  });
  public readonly isLoadingSubscription: Subscription = this.agencyFacade.loading$
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((isLoading: boolean) => {
        if (!isLoading) {
          this.closeUpdateSalesChannelModal();
        }
      })
    )
    .subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  public isLoading = false;
  public updateModalOpen = false;
  public addModalOpen = false;

  constructor(title: Title) {
    title.setTitle('Каналы продаж');
  }

  public onAddSalesChannelModalToggle(isOpen: boolean): void {
    this.addModalOpen = isOpen;
  }

  public onUpdateSalesChannelModalToggle(isOpen: false): void;
  public onUpdateSalesChannelModalToggle(isOpen: true, salesChannel: SalesChannelVM): void;
  public onUpdateSalesChannelModalToggle(isOpen: boolean, salesChannel: SalesChannelVM | null = null): void {
    this.updateModalOpen = isOpen;
    if (salesChannel) {
      this.updateForm.patchValue({
        id: salesChannel.id,
        channel: salesChannel.channel,
        title: salesChannel.title,
        accountId: `${salesChannel.accountId}`,
        status: salesChannel.status,
      });
    }
  }

  public onUpdateSalesChannel(): void {
    const formValue = this.updateForm.value;
    this.agencyFacade.updateSalesChannel({
      id: formValue.id as number,
      channel: formValue.channel as string,
      title: formValue.title as string,
      accountId: +(formValue.accountId as string),
      status: 'active',
    });
  }

  public onDeleteSalesChannel(channelId: number): void {
    this.agencyFacade.deleteSalesChannel(channelId);
  }

  public onStatusChange(channel: SalesChannelVM, newStatus: ChannelStatusVMType): void {
    this.agencyFacade.updateSalesChannel({
      ...channel,
      status: newStatus,
    });
  }

  private closeUpdateSalesChannelModal(): void {
    this.updateModalOpen = false;
    this.updateForm.reset({
      id: 0,
      channel: '',
      title: '',
      accountId: '',
      status: '',
    });
  }
}
