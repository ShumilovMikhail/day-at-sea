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
import { ModalComponent } from '@layers';
import { UiFormsInputComponent, UiFormsSelectComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';
import { FormBuilder } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MyBookingsFilters } from '../../types/filters.models';

@Component({
  selector: 'account-my-bookings-filters-ui',
  standalone: true,
  imports: [CommonModule, ModalComponent, UiFormsInputComponent, UiFormsSelectComponent, FormControlPipe],
  templateUrl: './my-bookings-filters-ui.component.html',
  styleUrl: './my-bookings-filters-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBookingsFiltersUiComponent implements OnInit {
  @Output() changeFiltersEvent = new EventEmitter<MyBookingsFilters>();
  @Input() isMobile!: boolean;
  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);
  public readonly form = this.fb.nonNullable.group({
    title: [''],
    amount: [''],
    source: [''],
    status: [''],
  });
  public isModalOpen = false;

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((filters) => {
      this.changeFiltersEvent.emit(filters as MyBookingsFilters);
    });
  }

  public onReset(): void {
    this.form.reset({
      title: '',
      amount: '',
      source: '',
      status: '',
    });
    this.changeDetectorRef.detectChanges();
  }

  public onIsModalChange(isModalOpen: boolean): void {
    this.isModalOpen = isModalOpen;
  }
}
