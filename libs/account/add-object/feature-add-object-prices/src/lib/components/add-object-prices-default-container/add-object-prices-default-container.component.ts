import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { ObjectFormPricesItemVM } from '../../types/prices-form.models';
import { AddObjectPricesItemContainerComponent } from '@account/add-object/feature-add-object-prices-item';

@Component({
  selector: 'account-add-object-prices-default-container',
  standalone: true,
  imports: [CommonModule, AddObjectPricesItemContainerComponent],
  templateUrl: './add-object-prices-default-container.component.html',
  styleUrl: './add-object-prices-default-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectPricesDefaultContainerComponent {
  @Input({ required: true }) defaultPrices!: FormGroup<ObjectFormPricesItemVM>;
  @Input() isSaving = false;
  @Output() saveEvent = new EventEmitter<void>();

  public onSave(): void {
    this.saveEvent.emit();
  }
}
