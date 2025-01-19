import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'home-header-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-header-ui.component.html',
  styleUrl: './home-header-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeaderUiComponent {}
