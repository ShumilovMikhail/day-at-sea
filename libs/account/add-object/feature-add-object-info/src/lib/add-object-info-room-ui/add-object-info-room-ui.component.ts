import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UiFormsAddressContainerComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-add-object-info-room-ui',
  standalone: true,
  imports: [CommonModule, UiFormsAddressContainerComponent, FormControlPipe, ReactiveFormsModule],
  templateUrl: './add-object-info-room-ui.component.html',
  styleUrl: './add-object-info-room-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectInfoRoomUiComponent implements OnInit {
  @Input({ required: true }) placementTypeControl!: FormControl<string>;
  @Input({ required: true }) addressControl!: FormControl<string>;
  @Input({ required: true }) placementControl!: FormControl<string>;
  @Input() isLoading = false;
  @Output() nextButtonClickEvent = new EventEmitter<void>();

  ngOnInit(): void {
    this.placementControl.patchValue('Отдельная комната');
  }

  public onNextButtonClickEvent(): void {
    this.nextButtonClickEvent.emit();
  }
}
