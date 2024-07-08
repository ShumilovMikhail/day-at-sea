import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-forms-counter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-forms-counter.component.html',
  styleUrl: './ui-forms-counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormsCounterComponent implements OnInit {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) set count(count: number | string) {
    if (!this.disabled && !isNaN(+count)) {
      this.countModel = +count;
    }
  }
  @Input() maxCount = 100;
  @Input() minCount = 0;
  @Input() label: string | undefined;
  @Input() errors: string[] | undefined;
  @Input() disabled = false;
  protected countModel: number = this.minCount;

  ngOnInit(): void {
    this.control.patchValue(this.countModel);
  }

  public onAdd(): void {
    if (this.countModel < this.maxCount && !this.disabled) {
      ++this.countModel;
      this.control.patchValue(this.countModel);
    }
  }

  public onReduce(): void {
    if (this.countModel > this.minCount && !this.disabled) {
      --this.countModel;
      this.control.patchValue(this.countModel);
    }
  }
}
