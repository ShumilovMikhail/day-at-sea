import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NumbersOnlyDirective } from '@utils/directives';

@Component({
  selector: 'ui-forms-input-numbers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NumbersOnlyDirective],
  templateUrl: './ui-forms-input-numbers.component.html',
  styleUrl: './ui-forms-input-numbers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormsInputNumbersComponent implements OnInit {
  @Input({ required: true }) control!: FormControl;
  @Input() label: string | undefined;
  @Input() required: boolean | undefined;
  @Input() placeholder: string | undefined;
  @Input() errors: string[] | undefined;
  @Input() crossEnable = false;
  @Input() disabled = false;
  @Input() type: string | null = null;
  @Input() absoluteError = false;
  private readonly changeDetectionRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.control.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetectionRef.markForCheck());
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
