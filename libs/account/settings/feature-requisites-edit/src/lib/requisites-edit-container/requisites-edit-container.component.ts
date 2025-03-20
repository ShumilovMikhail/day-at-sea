import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Signal,
  WritableSignal,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';

import { AgencyFacadeSignal } from '@account/data-access-agency';
import { RequisitesForm, RequisitesVM, UpdateRequisitesRequestVM } from '../types/requisites.models';
import { RequisitesEditUiComponent } from '../requisites-edit-ui/requisites-edit-ui.component';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';
import { fullNameValidator } from '@utils/validators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'account-requisites-edit-container',
  standalone: true,
  imports: [CommonModule, RequisitesEditUiComponent, UiIndicatorsLoaderComponent],
  templateUrl: './requisites-edit-container.component.html',
  styleUrl: './requisites-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequisitesEditContainerComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly agencyFacade = inject(AgencyFacadeSignal);
  private readonly loadedLogo = signal<string | ArrayBuffer | null>(null);
  public form!: FormGroup<RequisitesForm>;
  public requisites!: WritableSignal<RequisitesVM | null>;
  public readonly loading: Signal<boolean> = this.agencyFacade.loading;
  private readonly requisitesEffect = effect(() => {
    const requisites = this.agencyFacade.requisites();
    untracked(() => {
      if (requisites) {
        this.requisites.set(requisites);
        this.initializeForm();
        this.changeDetectorRef.detectChanges();
        this.requisitesEffect.destroy();
      }
    });
  });

  constructor(title: Title) {
    title.setTitle('Настройки - Реквизиты');
  }

  public onLoadLogo(logo: File): void {
    const fileReader = new FileReader();
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      this.loadedLogo.set(event.target!.result as string | ArrayBuffer | null);
    };
    fileReader.readAsDataURL(logo);
    this.form.get('logo')?.patchValue(URL.createObjectURL(logo));
  }

  public onSubmit(): void {
    this.agencyFacade.updateRequisites({
      ...this.form.value,
      logo: this.loadedLogo(),
    } as UpdateRequisitesRequestVM);
  }

  public onCancel(): void {
    this.router.navigateByUrl('account/settings');
  }

  private initializeForm(): void {
    const requisites = this.requisites();
    if (!requisites) {
      return;
    }
    this.form = this.fb.group({
      name: [requisites.name ?? ''],
      city: [requisites.city ?? ''],
      phone: [requisites.phone ?? ''],
      logo: [requisites.logo ?? null],
      contactPerson: [requisites.contactPerson ?? '', [Validators.required, fullNameValidator()]],
    });
  }
}
