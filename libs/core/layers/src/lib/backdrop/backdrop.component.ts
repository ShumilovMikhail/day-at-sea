import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'layers-backdrop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backdrop.component.html',
  styleUrl: './backdrop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackdropComponent {}
