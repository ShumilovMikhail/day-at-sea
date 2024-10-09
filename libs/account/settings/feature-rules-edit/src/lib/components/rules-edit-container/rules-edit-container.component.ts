import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiFormsTimeComponent } from '@ui/forms';

@Component({
  selector: 'account-rules-edit-container',
  standalone: true,
  imports: [CommonModule, UiFormsTimeComponent],
  templateUrl: './rules-edit-container.component.html',
  styleUrl: './rules-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RulesEditContainerComponent {}
