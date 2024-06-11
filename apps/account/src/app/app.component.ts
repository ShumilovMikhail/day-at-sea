import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { filter, take } from 'rxjs';

import { AuthFacade } from '@auth/data-access';
import { UserFacade } from '@user/data-access';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly authFacade = inject(AuthFacade);
  public readonly userFacade = inject(UserFacade);

  ngOnInit(): void {
    this.authFacade.init();
    this.authFacade.isAuthenticate$
      .pipe(
        filter((isAuthenticate: boolean) => isAuthenticate),
        take(1)
      )
      .subscribe(() => {
        this.userFacade.init();
      });
  }
}
