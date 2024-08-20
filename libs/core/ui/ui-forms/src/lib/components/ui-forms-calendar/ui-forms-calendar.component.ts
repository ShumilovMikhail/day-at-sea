import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';

import { formatDate } from '@utils/functions';

@Component({
  selector: 'ui-forms-calendar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatFormField, MatHint, MatLabel, MatInputModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './ui-forms-calendar.component.html',
  styleUrl: './ui-forms-calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormsCalendarComponent implements OnInit {
  @Input({ required: true }) control!: FormControl;
  @Input() label: string | undefined;
  @Input() required: boolean | undefined;
  @Input() placeholder: string | undefined;
  @Input() errors: string[] | undefined;
  @Input() disabled = false;
  @Input() absoluteError = false;
  private readonly changeDetectionRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.control.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetectionRef.markForCheck());
  }

  onDateChange(dateEvent: any) {
    this.control.patchValue(formatDate(dateEvent.value));
  }

  public onFocus(): void {
    this.control.markAsUntouched();
  }

  onReset() {
    if (!this.disabled) {
      this.control.patchValue('');
    }
  }
}
