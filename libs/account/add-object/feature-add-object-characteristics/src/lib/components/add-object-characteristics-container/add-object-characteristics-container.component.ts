import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LetDirective } from '@ngrx/component';
import { filter, Observable, withLatestFrom } from 'rxjs';

import { CharacteristicsFormVM } from '../../types/characteristics-form.models';
import { AddObjectCharacteristicsGeneralParametersUiComponent } from '../add-object-characteristics-general-parameters-ui/add-object-characteristics-general-parameters-ui.component';
import { FormControlPipe, FormGroupPipe } from '@utils/pipes';
import { AddObjectCharacteristicsRoomsUiComponent } from '../add-object-characteristics-rooms-ui/add-object-characteristics-rooms-ui.component';
import { AddObjectCharacteristicsAmenitiesUiComponent } from '../add-object-characteristics-amenities-ui/add-object-characteristics-amenities-ui.component';
import { AddObjectCharacteristicsDescriptionUiComponent } from '../add-object-characteristics-description-ui/add-object-characteristics-description-ui.component';
import { AddObjectButtonsUiComponent } from '@account/add-object/ui';
import { ObjectCharacteristicsVM } from '../../types/characteristics.models';
import { ObjectFormStore } from '@account/add-object/data-access';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';

@Component({
  selector: 'account-add-object-characteristics-container',
  standalone: true,
  imports: [
    CommonModule,
    AddObjectCharacteristicsGeneralParametersUiComponent,
    LetDirective,
    FormControlPipe,
    AddObjectCharacteristicsRoomsUiComponent,
    FormGroupPipe,
    AddObjectCharacteristicsAmenitiesUiComponent,
    AddObjectCharacteristicsDescriptionUiComponent,
    AddObjectButtonsUiComponent,
    UiIndicatorsLoaderComponent,
  ],
  templateUrl: './add-object-characteristics-container.component.html',
  styleUrl: './add-object-characteristics-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectCharacteristicsContainerComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly objectFormStore = inject(ObjectFormStore);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public readonly isSaving$: Observable<boolean> = this.objectFormStore.isSaving$;
  public placementControl!: FormControl<string>;
  public form!: FormGroup<CharacteristicsFormVM>;

  ngOnInit(): void {
    this.objectFormStore.characteristicsForm$
      .pipe(
        withLatestFrom(this.objectFormStore.placementControl$),
        filter(
          (
            args: [FormGroup<CharacteristicsFormVM> | null, FormControl<string> | null]
          ): args is [FormGroup<CharacteristicsFormVM>, FormControl<string>] => Boolean(args[0] && args[1])
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(([form, control]: [FormGroup<CharacteristicsFormVM>, FormControl<string>]) => {
        this.form = form;
        this.placementControl = control;
        this.changeDetectorRef.detectChanges();
      });
  }

  constructor(title: Title) {
    title.setTitle('Добавить объект');
  }

  public onNext(): void {
    this.router.navigateByUrl('account/add-object/photos');
  }

  public onSave(): void {
    this.objectFormStore.saveForm({
      characteristics: this.form.value as ObjectCharacteristicsVM,
    });
  }
}
