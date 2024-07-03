import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { SearchDirective } from '../../../directives/search.directive';
import { ClickOutsideDirective } from '@utils/directives';

@Component({
  selector: 'ui-forms-address-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchDirective, ClickOutsideDirective],
  templateUrl: './ui-forms-address-ui.component.html',
  styleUrl: './ui-forms-address-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormsAddressUiComponent implements OnInit {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) isSearching!: boolean;
  @Input({ required: true }) cities: string[] | null = null;
  @Input() label: string | undefined;
  @Input() required: boolean | undefined;
  @Input() placeholder: string | undefined;
  @Input() errors: string[] | undefined;
  @Input() crossEnable = false;
  @Input() disabled = false;
  @Output() crossClickEvent = new EventEmitter<void>();
  @Output() changeInputEvent = new EventEmitter<void>();
  @Output() blurEvent = new EventEmitter<void>();
  @Output() citySelectEvent = new EventEmitter<string>();
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

  public onCrossClick(): void {
    this.crossClickEvent.emit();
  }

  public onChangeInput(): void {
    this.changeInputEvent.emit();
  }

  public onBlur(): void {
    this.blurEvent.emit();
  }

  public onCitySelect(item: string): void {
    this.citySelectEvent.emit(item);
  }
}
