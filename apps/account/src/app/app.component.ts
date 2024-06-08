import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterContainerComponent } from '@auth/feature-register';

@Component({
  standalone: true,
  imports: [RouterModule, RegisterContainerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
