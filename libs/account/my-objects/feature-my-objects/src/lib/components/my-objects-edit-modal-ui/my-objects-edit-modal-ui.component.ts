import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ModalComponent } from '@layers';
import { ObjectEditForm } from '../../types/my-objects-vm.models';
import { UiFormsSelectComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-my-objects-edit-modal-ui',
  standalone: true,
  imports: [CommonModule, ModalComponent, UiFormsSelectComponent, FormControlPipe, ReactiveFormsModule],
  templateUrl: './my-objects-edit-modal-ui.component.html',
  styleUrl: './my-objects-edit-modal-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyObjectsEditModalUiComponent {
  @Input({ required: true }) objectForm!: FormGroup<ObjectEditForm>;
  @Input({ required: true }) set salesChannels(salesChannels: string[]) {
    this.salesChannelsList = ['нет', ...salesChannels];
  }
  @Input() isLoading = false;
  @Output() modalCloseEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<void>();
  get title(): string {
    return this.objectForm.value.title as string;
  }
  public salesChannelsList: string[] = [];

  public onModalClose(): void {
    this.modalCloseEvent.emit();
  }

  public onSubmit(): void {
    this.submitEvent.emit();
  }
}
