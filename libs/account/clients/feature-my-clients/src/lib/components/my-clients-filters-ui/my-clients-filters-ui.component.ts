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
import { UiFormsCounterComponent, UiFormsInputComponent, UiFormsSelectComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';
import { MyClientsFilters } from '../../types/filters.models';

@Component({
  selector: 'account-my-clients-filters-ui',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    UiFormsInputComponent,
    UiFormsSelectComponent,
    FormControlPipe,
    UiFormsCounterComponent,
  ],
  templateUrl: './my-clients-filters-ui.component.html',
  styleUrl: './my-clients-filters-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyClientsFiltersUiComponent implements OnInit {
  @Output() changeFiltersEvent = new EventEmitter<MyClientsFilters>();
  @Input() isMobile!: boolean;
  @Input({ required: true }) objectsTitle!: string[];
  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);
  public readonly form = this.fb.nonNullable.group({
    fullName: [''],
    objectTitle: [''],
    isVip: [''],
    bookingsCount: [0],
  });
  public isModalOpen = false;
  public bookingsCount = 0;

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((filters) => {
      this.bookingsCount = filters.bookingsCount ?? 0;
      this.changeFiltersEvent.emit(filters as MyClientsFilters);
    });
  }

  public onReset(): void {
    this.form.reset({
      fullName: '',
      objectTitle: '',
      isVip: '',
      bookingsCount: 0,
    });
    this.changeDetectorRef.detectChanges();
  }

  public onIsModalChange(isModalOpen: boolean): void {
    this.isModalOpen = isModalOpen;
  }
}
