import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'account-update-booking-note-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-booking-note-ui.component.html',
  styleUrl: './update-booking-note-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateBookingNoteUiComponent {
  @Input({ required: true }) note!: FormControl<string>;
}
