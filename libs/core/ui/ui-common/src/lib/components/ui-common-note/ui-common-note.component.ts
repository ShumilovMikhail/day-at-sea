import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-common-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-common-note.component.html',
  styleUrl: './ui-common-note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCommonNoteComponent {
  @Input() note: string | null = null;
}
