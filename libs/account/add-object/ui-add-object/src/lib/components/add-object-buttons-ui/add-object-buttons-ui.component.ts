import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-add-object-buttons-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-object-buttons-ui.component.html',
  styleUrl: './add-object-buttons-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectButtonsUiComponent {
  @Input() nextButtonDisable = false;
  @Input() isSaving = false;
  @Output() saveButtonClickEvent = new EventEmitter<void>();
  @Output() nextButtonClickEvent = new EventEmitter<void>();

  public onSaveButtonClick(): void {
    this.saveButtonClickEvent.emit();
  }
  public onNextButtonClick(): void {
    this.nextButtonClickEvent.emit();
  }
}
