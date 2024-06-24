import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-add-object-type-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-object-type-ui.component.html',
  styleUrl: './add-object-type-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectTypeUiComponent {}
