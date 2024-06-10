import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthFacade } from '@auth/data-access';
import { RegisterContainerComponent } from '@auth/feature-register';

@Component({
  standalone: true,
  imports: [RouterModule, RegisterContainerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly authFacade = inject(AuthFacade);

  ngOnInit(): void {
    this.authFacade.init();
  }
}
