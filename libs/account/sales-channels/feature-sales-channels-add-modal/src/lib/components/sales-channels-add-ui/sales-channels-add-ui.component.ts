import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ModalComponent } from '@layers';
import { AddChannelForm } from '../../types/add-channel-form.models';
import { UiFormsInputComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-sales-channels-add-ui',
  standalone: true,
  imports: [CommonModule, ModalComponent, ReactiveFormsModule, UiFormsInputComponent, FormControlPipe],
  templateUrl: './sales-channels-add-ui.component.html',
  styleUrl: './sales-channels-add-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesChannelsAddUiComponent {
  @Input({ required: true }) form!: FormGroup<AddChannelForm>;
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
