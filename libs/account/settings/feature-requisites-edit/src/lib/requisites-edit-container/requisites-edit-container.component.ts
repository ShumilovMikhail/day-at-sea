import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { Observable, filter, take } from 'rxjs';

import { AgencyFacade } from '@account/data-access-agency';
import { RequisitesForm, RequisitesVM, UpdateRequisitesRequestVM } from '../types/requisites.models';
import { RequisitesEditUiComponent } from '../requisites-edit-ui/requisites-edit-ui.component';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';
import { fullNameValidator } from '@utils/validators';

@Component({
  selector: 'account-requisites-edit-container',
  standalone: true,
  imports: [CommonModule, RequisitesEditUiComponent, LetDirective, UiIndicatorsLoaderComponent],
  templateUrl: './requisites-edit-container.component.html',
  styleUrl: './requisites-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequisitesEditContainerComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly agencyFacade = inject(AgencyFacade);
  private loadedLogo: string | ArrayBuffer | null = null;
  public form!: FormGroup<RequisitesForm>;
  public requisites!: RequisitesVM | null;
  public readonly loading$: Observable<boolean> = this.agencyFacade.loading$;

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

  public onLoadLogo(logo: File): void {
    const fileReader = new FileReader();
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      this.loadedLogo = event.target!.result as string | ArrayBuffer | null;
    };
    fileReader.readAsDataURL(logo);
    this.form.get('logo')?.patchValue(URL.createObjectURL(logo));
  }

  public onSubmit(): void {
    this.agencyFacade.updateRequisites({
      ...this.form.value,
      logo: this.loadedLogo,
    } as UpdateRequisitesRequestVM);
  }

  public onCancel(): void {
    this.router.navigateByUrl('account/settings');
  }

  private initializeForm(): void {
    if (!this.requisites) {
      return;
    }
    this.form = this.fb.group({
      name: [this.requisites.name ?? ''],
      city: [this.requisites.city ?? ''],
      phone: [this.requisites.phone ?? ''],
      logo: [this.requisites.logo ?? null],
      contactPerson: [this.requisites.contactPerson ?? '', [Validators.required, fullNameValidator()]],
    });
  }
}
