import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-requisites-edit-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requisites-edit-container.component.html',
  styleUrl: './requisites-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequisitesEditContainerComponent {}
