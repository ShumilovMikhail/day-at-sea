import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiFormsAddressUiComponent } from '../ui-forms-address-ui/ui-forms-address-ui.component';
import { FormControl } from '@angular/forms';
import { DadataAddressService } from '@dadata/data-access-address';
import { take } from 'rxjs';

@Component({
  selector: 'ui-forms-address-container',
  standalone: true,
  imports: [CommonModule, UiFormsAddressUiComponent],
  templateUrl: './ui-forms-address-container.component.html',
  styleUrl: './ui-forms-address-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormsAddressContainerComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label: string | undefined;
  @Input() required: boolean | undefined;
  @Input() placeholder: string | undefined;
  @Input() errors: string[] | undefined;
  @Input() crossEnable = false;
  @Input() disabled = false;
  private readonly addressService = inject(DadataAddressService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public cities: string[] | null = null;
  public isSearching = false;

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
        this.changeDetectorRef.detectChanges();
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
