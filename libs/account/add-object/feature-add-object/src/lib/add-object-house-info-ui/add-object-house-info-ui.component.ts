import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

import { UiFormsAddressComponent, UiFormsSelectComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

const typeOptions = [
  'Коттедж',
  'Дом',
  'Вилла',
  'Часть дома с отдельным входом',
  'Эллинг',
  'Деревенский дом',
  'Таунхаус',
  'Целый этаж в доме',
  'Гестхаус',
  'Шале',
  'Бунгало',
  'Дом на колёсах',
  'Особняк',
  'Яхта',
  'Дача',
];

@Component({
  selector: 'account-add-object-house-info-ui',
  standalone: true,
  templateUrl: './add-object-house-info-ui.component.html',
  styleUrl: './add-object-house-info-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, UiFormsSelectComponent, FormControlPipe, UiFormsAddressComponent],
})
export class AddObjectHouseInfoUiComponent {
  @Input() isLoading = false;
  private readonly fb = inject(FormBuilder);
  public typeOptions = typeOptions;
  public form = this.fb.group({
    type: ['', [Validators.required]],
    address: ['', [Validators.required]],
  });
}
