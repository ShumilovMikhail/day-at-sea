import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-add-object-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-object-container.component.html',
  styleUrl: './add-object-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectContainerComponent {}
