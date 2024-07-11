import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { filter, Observable, share, take, tap } from 'rxjs';

import { FormArrayPipe, FormControlPipe } from '@utils/pipes';
import { AddObjectInfrastructureContainerComponent } from '@account/add-object/feature-add-object-infrastructure';
import {
  ObjectEntity,
  ObjectForm,
  ObjectFormCharacteristics,
  ObjectFormInfrastructure,
  ObjectFormPhotos,
  ObjectFormRules,
} from '@account/add-object/util';
import { AddObjectCharacteristicsContainerComponent } from '@account/add-object/feature-add-object-characteristics';
import { AddObjectPhotosContainerComponent } from '@account/add-object/feature-add-object-photos';
import { AddObjectRulesContainerComponent } from '@account/add-object/feature-add-object-rules';
import { AddObjectServicesContainerComponent } from '@account/add-object/feature-add-object-services';
import { AddObjectPricesContainerComponent } from '@account/add-object/feature-add-object-prices';
import { ObjectFormState, ObjectFormStore } from '@account/add-object/data-access';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';

@Component({
  selector: 'account-add-object-container',
  standalone: true,
  imports: [
    CommonModule,
    FormControlPipe,
    FormArrayPipe,
    AddObjectInfrastructureContainerComponent,
    AddObjectCharacteristicsContainerComponent,
    AddObjectPhotosContainerComponent,
    AddObjectRulesContainerComponent,
    AddObjectServicesContainerComponent,
    AddObjectPricesContainerComponent,
    UiIndicatorsLoaderComponent,
  ],
  templateUrl: './add-object-container.component.html',
  styleUrl: './add-object-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectContainerComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly formStore = inject(ObjectFormStore);
  public readonly loading$: Observable<boolean> = this.formStore.isLoading$.pipe(
    tap((isLoading) => console.log(isLoading)),
    share()
  );
  public form!: FormGroup<ObjectForm> | null;
  public step: string | null = null;

  public get infrastructureForm(): FormGroup<ObjectFormInfrastructure> {
    return this.form?.get('infrastructure') as FormGroup<ObjectFormInfrastructure>;
  }

  public get characteristicsForm(): FormGroup<ObjectFormCharacteristics> {
    return this.form?.get('characteristics') as FormGroup<ObjectFormCharacteristics>;
  }

  public get photosForm(): FormGroup<ObjectFormPhotos> {
    return this.form?.get('photos') as FormGroup<ObjectFormPhotos>;
  }

  public get rulesForm(): FormGroup<ObjectFormRules> {
    return this.form?.get('rules') as FormGroup<ObjectFormRules>;
  }

  constructor(title: Title) {
    title.setTitle('Добавить объект');
  }

  ngOnInit(): void {
    this.formStore.initForm();
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params: Params) => {
      this.step = params['step'];
      this.changeDetectorRef.detectChanges();
    });
    this.formStore.formState$
      .pipe(
        filter((formState: ObjectFormState) => Boolean(formState.form)),
        take(1)
      )
      .subscribe((formState: ObjectFormState) => {
        this.form = formState.form;
        this.changeDetectorRef.detectChanges();
      });
  }

  public onPublish(): void {
    this.formStore.publish(this.form?.value as ObjectEntity);
  }

  ngOnDestroy(): void {
    this.formStore.destroyForm();
  }
}
