import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';

import { AgencyFacade } from '@account/data-access-agency';
import { RequisitesForm, RequisitesVM } from '../types/requisites.models';
import { RequisitesEditUiComponent } from '../requisites-edit-ui/requisites-edit-ui.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, take } from 'rxjs';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';

@Component({
  selector: 'account-requisites-edit-container',
  standalone: true,
  imports: [CommonModule, RequisitesEditUiComponent, LetDirective, UiIndicatorsLoaderComponent],
  templateUrl: './requisites-edit-container.component.html',
  styleUrl: './requisites-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequisitesEditContainerComponent implements OnInit {
  private readonly agencyFacade = inject(AgencyFacade);
  private readonly fb = inject(FormBuilder);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public form!: FormGroup<RequisitesForm>;
  public requisites!: RequisitesVM | null;

  ngOnInit(): void {
    this.agencyFacade.requisites$
      .pipe(
        filter((requisites: RequisitesVM | null): requisites is RequisitesVM => Boolean(requisites)),
        take(1)
      )
      .subscribe((requisites: RequisitesVM) => {
        this.requisites = requisites;
        this.initializeForm();
        this.changeDetectorRef.detectChanges();
      });
  }

  private initializeForm() {
    if (!this.requisites) {
      return;
    }
    this.form = this.fb.group({
      name: [this.requisites.name ?? ''],
      city: [this.requisites.city ?? ''],
      phone: [this.requisites.phone ?? ''],
      logo: [this.requisites.logo ?? null],
      contactPerson: [this.requisites.contactPerson ?? ''],
    });
  }
}
