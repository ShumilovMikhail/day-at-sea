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

import { UiFormsInputComponent, UiFormsSelectComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalComponent } from '@layers';
import { MyObjectsFilters } from '../../types/my-objects-state';

@Component({
  selector: 'account-my-objects-filters-ui',
  standalone: true,
  imports: [CommonModule, UiFormsSelectComponent, UiFormsInputComponent, FormControlPipe, ModalComponent],
  templateUrl: './my-objects-filters-ui.component.html',
  styleUrl: './my-objects-filters-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyObjectsFiltersUiComponent implements OnInit {
  @Output() changeFiltersEvent = new EventEmitter<MyObjectsFilters>();
  @Input({ required: true }) set salesChannels(salesChannels: string[]) {
    this.salesChannelsList = ['', 'нет', ...salesChannels];
  }
  @Input() isMobile!: boolean;
  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);
  public readonly form = this.fb.nonNullable.group({
    title: [''],
    bookingMethod: [''],
    price: [''],
    salesChannel: [''],
    guestCount: [''],
  });
  public salesChannelsList: string[] | null = null;
  public isModalOpen = false;

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((filters) => {
      this.changeFiltersEvent.emit(filters as MyObjectsFilters);
    });
  }

  public onReset(): void {
    this.form.reset({
      title: '',
      bookingMethod: '',
      price: '',
      salesChannel: '',
      guestCount: '',
    });
    this.changeDetectorRef.detectChanges();
  }

  public onIsModalChange(isModalOpen: boolean): void {
    this.isModalOpen = isModalOpen;
  }
}
