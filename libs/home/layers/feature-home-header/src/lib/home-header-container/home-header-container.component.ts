import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeaderUiComponent } from '../home-header-ui/home-header-ui.component';

@Component({
  selector: 'home-header-container',
  standalone: true,
  imports: [CommonModule, HomeHeaderUiComponent],
  templateUrl: './home-header-container.component.html',
  styleUrl: './home-header-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeaderContainerComponent {}
