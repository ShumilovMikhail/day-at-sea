import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { LetDirective } from '@ngrx/component';
import { filter, Observable } from 'rxjs';

import { ObjectFormRulesVM } from '../../types/rules-form.models';
import { AddObjectRulesArrivalUiComponent } from '../add-object-rules-arrival-ui/add-object-rules-arrival-ui.component';
import { FormArrayPipe, FormControlPipe } from '@utils/pipes';
import { AddObjectRulesListUiComponent } from '../add-object-rules-list-ui/add-object-rules-list-ui.component';
import { AddObjectRulesBookingUiComponent } from '../add-object-rules-booking-ui/add-object-rules-booking-ui.component';
import { AddObjectRulesDescriptionUiComponent } from '../add-object-rules-description-ui/add-object-rules-description-ui.component';
import { AddObjectButtonsUiComponent } from '@account/add-object/ui';
import { ObjectFormStore } from '@account/add-object/data-access';
import { ObjectRulesVM } from '../../types/rules.models';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';

@Component({
  selector: 'account-add-object-rules-container',
  standalone: true,
  imports: [
    CommonModule,
    AddObjectRulesArrivalUiComponent,
    LetDirective,
    FormControlPipe,
    AddObjectRulesListUiComponent,
    FormArrayPipe,
    AddObjectRulesBookingUiComponent,
    AddObjectRulesDescriptionUiComponent,
    AddObjectButtonsUiComponent,
    UiIndicatorsLoaderComponent,
  ],
  templateUrl: './add-object-rules-container.component.html',
  styleUrl: './add-object-rules-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectRulesContainerComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly objectFormStore = inject(ObjectFormStore);
  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public readonly isSaving$: Observable<boolean> = this.objectFormStore.isSaving$;
  public form!: FormGroup<ObjectFormRulesVM>;

  ngOnInit(): void {
    this.objectFormStore.rulesForm$
      .pipe(
        filter((form: FormGroup<ObjectFormRulesVM> | null): form is FormGroup<ObjectFormRulesVM> => Boolean(form)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((form: FormGroup<ObjectFormRulesVM>) => {
        this.form = form;
        this.changeDetectorRef.detectChanges();
      });
  }

  constructor(title: Title) {
    title.setTitle('Добавить объект');
  }

  public onNext(): void {
    this.router.navigateByUrl('account/add-object/services');
  }

  public onSave(): void {
    this.objectFormStore.saveForm({ rules: this.form.value as ObjectRulesVM });
  }
}
