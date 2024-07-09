import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { UiFormsAddressContainerComponent, UiFormsInputComponent } from '@ui/forms';
import { PlacementTypeDataService } from '@account/add-object/util';
@Component({
  selector: 'account-add-object-info-house-ui',
  standalone: true,
  templateUrl: './add-object-info-house-ui.component.html',
  styleUrl: './add-object-info-house-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, UiFormsAddressContainerComponent, ReactiveFormsModule, UiFormsInputComponent],
  providers: [PlacementTypeDataService],
})
export class AddObjectInfoHouseUiComponent implements OnInit {
  @Input({ required: true }) titleControl!: FormControl<string>;
  @Input({ required: true }) addressControl!: FormControl<string>;
  @Input({ required: true }) placementControl!: FormControl<string>;
  @Input() isLoading = false;
  @Output() nextButtonClickEvent = new EventEmitter<void>();
  private readonly placement = 'Дом, коттедж';
  private readonly placementTypeDataService = inject(PlacementTypeDataService);
  public readonly typeOptions = this.placementTypeDataService.typesData[this.placement];

  ngOnInit(): void {
    this.placementControl.patchValue(this.placement);
  }

  public onNextButtonClickEvent(): void {
    this.nextButtonClickEvent.emit();
  }
}
