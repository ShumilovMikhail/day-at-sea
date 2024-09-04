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
import { FormArray, FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface MyObjectVM {
  id: number;
  title: string;
}

@Component({
  selector: 'ui-forms-objects-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-forms-objects-picker.component.html',
  styleUrl: './ui-forms-objects-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormsObjectsPickerComponent implements OnInit {
  @Input({ required: true }) array!: FormArray;
  @Input({ required: true }) objects!: MyObjectVM[];
  @Input() label: string | undefined;
  private readonly changeDetectionRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  public sortedObjects!: MyObjectVM[];

  ngOnInit(): void {
    this.sortedObjects = this.objects;
    this.array.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetectionRef.markForCheck());
  }

  public isChecked(id: number): boolean {
    return this.array.value.findIndex((item: number) => item == id) !== -1;
  }

  public onCheckboxToggle(id: number, isChecked: boolean): void {
    if (isChecked) this.array.push(new FormControl(+id));
    else {
      const idIndex = this.array.value.findIndex((item: number) => item == id);
      this.array.removeAt(idIndex);
    }
  }

  public onSearch(text: string): void {
    console.log(text !== '');
    this.sortedObjects = this.objects.filter((item) =>
      text !== '' ? item.title.toLowerCase().includes(text.toLowerCase()) : true
    );
  }

  public onFocus(): void {
    this.array.markAsUntouched();
  }
}
