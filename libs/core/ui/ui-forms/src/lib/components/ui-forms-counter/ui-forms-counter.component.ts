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
  @Input({ required: true }) count!: number;
  @Input() maxCount = 100;
  @Input() minCount = 0;
  @Input() label: string | undefined;
  @Input() errors: string[] | undefined;
  @Input() disabled = false;

  ngOnInit(): void {
    this.control.patchValue(`${this.count}`);
  }

  public onAdd(): void {
    if (this.count < this.maxCount && !this.disabled) {
      ++this.count;
      this.control.patchValue(`${this.count}`);
    }
  }

  public onReduce(): void {
    if (this.count > this.minCount && !this.disabled) {
      --this.count;
      this.control.patchValue(`${this.count}`);
    }
  }
}
