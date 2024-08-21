import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'account-add-booking-note-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-booking-note-ui.component.html',
  styleUrl: './add-booking-note-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookingNoteUiComponent {
  @Input({ required: true }) note!: FormControl<string>;
}
