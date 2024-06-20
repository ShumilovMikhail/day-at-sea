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

import { AddressDirective } from '../../directives/address.directive';

@Component({
  selector: 'ui-forms-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddressDirective],
  templateUrl: './ui-forms-address.component.html',
  styleUrl: './ui-forms-address.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormsAddressComponent implements OnInit {
  @Input({ required: true }) control!: FormControl;
  @Input() label: string | undefined;
  @Input() required: boolean | undefined;
  @Input() placeholder: string | undefined;
  @Input() errors: string[] | undefined;
  @Input() crossEnable = false;
  private readonly changeDetectionRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  public cities: string[] | null = null;

  ngOnInit(): void {
    this.control.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetectionRef.markForCheck());
  }

  public onFocus(): void {
    this.control.markAsUntouched();
  }

  public onReset(): void {
    this.control.patchValue('');
  }

  public onFindCities(cities: string[]): void {
    this.cities = cities;
  }

  public onCitySelect(city: string): void {
    this.control.patchValue(city);
    this.cities = null;
  }
}
