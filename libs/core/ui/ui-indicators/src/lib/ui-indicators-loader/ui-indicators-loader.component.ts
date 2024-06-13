import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-indicators-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-indicators-loader.component.html',
  styleUrl: './ui-indicators-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIndicatorsLoaderComponent {}
