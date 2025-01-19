import { Component } from '@angular/core';
import { HomeHeaderContainerComponent } from '@home/feature-header';

@Component({
  standalone: true,
  imports: [HomeHeaderContainerComponent],
  selector: 'home-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
