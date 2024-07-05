import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'account-add-object-rules-description-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-object-rules-description-ui.component.html',
  styleUrl: './add-object-rules-description-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectRulesDescriptionUiComponent {
  @Input({ required: true }) descriptionControl!: FormControl<string>;
}
