import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UpdateChannelForm } from '../../types/update-channel-form.models';
import { ModalComponent } from '@layers';
import { UiFormsInputComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-sales-channels-update-ui',
  standalone: true,
  imports: [CommonModule, ModalComponent, ReactiveFormsModule, UiFormsInputComponent, FormControlPipe],
  templateUrl: './sales-channels-update-ui.component.html',
  styleUrl: './sales-channels-update-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesChannelsUpdateUiComponent {
  @Input({ required: true }) form!: FormGroup<UpdateChannelForm>;
  @Input() isLoading = false;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<void>();

  public onClose(): void {
    this.closeEvent.emit();
  }

  public onSubmit(): void {
    this.submitEvent.emit();
  }
}
