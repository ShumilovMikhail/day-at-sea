import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddChannelForm } from '../../types/add-channel-form.models';
import { SalesChannelVM } from '../../types/sales-channels.models';
import { isNotNumberValidator } from '@utils/validators';
import { AgencyFacade } from '@account/data-access-agency';
import { salesChannelTitleValidator } from '../../utils/sales-channel-title.validator';
import { SalesChannelsAddUiComponent } from '../sales-channels-add-ui/sales-channels-add-ui.component';

@Component({
  selector: 'account-sales-channels-add-modal-container',
  standalone: true,
  imports: [CommonModule, SalesChannelsAddUiComponent],
  templateUrl: './sales-channels-add-modal-container.component.html',
  styleUrl: './sales-channels-add-modal-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesChannelsAddModalContainerComponent implements OnInit {
  @Input({ required: true }) set salesChannels(salesChannels: SalesChannelVM[]) {
    this.salesChannelsTitle = salesChannels.map((salesChannel) => salesChannel.title);
  }
  @Output() closeEvent = new EventEmitter<void>();

  private readonly agencyFacade = inject(AgencyFacade);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly isLoadingSubscription = this.agencyFacade.loading$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((isLoading) => {
      this.isLoading = isLoading;
      if (!isLoading && this.isAdding) {
        this.closeEvent.emit();
      }
    });
  private isAdding = false;
  private salesChannelsTitle: string[] = [];
  public isLoading = false;
  public addForm!: FormGroup<AddChannelForm>;

  ngOnInit(): void {
    this.addForm = this.fb.nonNullable.group({
      channel: ['', [Validators.required]],
      title: ['', [Validators.required, salesChannelTitleValidator(this.salesChannelsTitle)]],
      accountId: ['', [Validators.required, isNotNumberValidator()]],
    });
  }

  public onAddSalesChannel(): void {
    const formValue = this.addForm.value;
    this.agencyFacade.addSalesChannels({
      channel: formValue.channel as string,
      title: formValue.title as string,
      accountId: +(formValue.accountId as string),
      status: 'active',
    });
    this.isAdding = true;
  }

  public onClose(): void {
    this.closeEvent.emit();
  }
}
