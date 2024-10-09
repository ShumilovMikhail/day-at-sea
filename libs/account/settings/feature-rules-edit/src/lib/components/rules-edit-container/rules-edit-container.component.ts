import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-rules-edit-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rules-edit-container.component.html',
  styleUrl: './rules-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RulesEditContainerComponent {}
