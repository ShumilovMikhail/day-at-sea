import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ModalComponent } from '@layers';
import { UiFormsCalendarComponent, UiFormsInputComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';
import { CostsFilters } from '../../types/filters.models';
import { untilDateValidator } from '../../utils/until-date.validator';

@Component({
  selector: 'account-costs-filters-ui',
  standalone: true,
  imports: [CommonModule, ModalComponent, UiFormsInputComponent, UiFormsCalendarComponent, FormControlPipe],
  templateUrl: './costs-filters-ui.component.html',
  styleUrl: './costs-filters-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostsFiltersUiComponent implements OnInit {
  @Output() changeFiltersEvent = new EventEmitter<CostsFilters>();
  @Input() isMobile!: boolean;
  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);
  public readonly form = this.fb.nonNullable.group({
    objectTitle: [''],
    expenseItem: [''],
    from: [''],
    until: [''],
  });
  public isModalOpen = false;

  ngOnInit(): void {
    this.form.get('until')?.addValidators(untilDateValidator(this.form.get('from')!));
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((filters) => {
      this.changeFiltersEvent.emit(filters as CostsFilters);
    });
  }

  public onReset(): void {
    this.form.reset({
      objectTitle: '',
      expenseItem: '',
      from: '',
      until: '',
    });
    this.changeDetectorRef.detectChanges();
  }

  public onIsModalChange(isModalOpen: boolean): void {
    this.isModalOpen = isModalOpen;
  }
}
