import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'layers-dialog-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogBoxComponent {
  @Output() closeDialogBoxEvent = new EventEmitter<void>();
  public onCrossClick(): void {
    this.closeDialogBoxEvent.emit();
  }
}
