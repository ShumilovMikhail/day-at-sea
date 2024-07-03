import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { UiFormsAddressContainerComponent, UiFormsSelectComponent } from '@ui/forms';

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
  selector: 'account-add-object-info-house-ui',
  standalone: true,
  templateUrl: './add-object-info-house-ui.component.html',
  styleUrl: './add-object-info-house-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, UiFormsSelectComponent, UiFormsAddressContainerComponent, ReactiveFormsModule],
})
export class AddObjectInfoHouseUiComponent implements OnInit {
  @Input({ required: true }) placementTypeControl!: FormControl<string>;
  @Input({ required: true }) addressControl!: FormControl<string>;
  @Input({ required: true }) placementControl!: FormControl<string>;
  @Input() isLoading = false;
  @Output() nextButtonClickEvent = new EventEmitter<void>();
  public readonly typeOptions = typeOptions;

  ngOnInit(): void {
    this.placementControl.patchValue('Дом, коттедж');
  }

  public onNextButtonClickEvent(): void {
    this.nextButtonClickEvent.emit();
  }
}
