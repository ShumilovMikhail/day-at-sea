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
import { take } from 'rxjs';

import { SearchDirective } from '../../directives/search.directive';
import { DadataAddressService } from '@dadata/data-access-address';
import { ClickOutsideDirective } from '@utils/directives';

@Component({
  selector: 'ui-forms-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchDirective, ClickOutsideDirective],
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
  @Input() disabled = false;
  private readonly changeDetectionRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly addressService = inject(DadataAddressService);
  public cities: string[] | null = null;
  public isSearching = false;

  ngOnInit(): void {
    this.control.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetectionRef.markForCheck());
  }

  public onFocus(): void {
    this.control.markAsUntouched();
  }

  public onReset(): void {
    if (!this.disabled) {
      this.control.patchValue('');
    }
  }

  public onSearch(): void {
    this.addressService
      .getCities(this.control.value)
      .pipe(take(1))
      .subscribe((cities: string[]) => {
        this.cities = cities;
        this.isSearching = true;
        this.changeDetectionRef.detectChanges();
      });
  }

  public onSearchTermination(): void {
    this.isSearching = false;
  }

  public onCitySelect(city: string): void {
    this.control.patchValue(city);
    this.isSearching = false;
  }
}
