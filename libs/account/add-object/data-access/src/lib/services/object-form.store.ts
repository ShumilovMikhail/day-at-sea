import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';

import {
  ObjectEntity,
  createObjectForm,
  ObjectForm,
  ObjectFormInfrastructure,
  ObjectFormCharacteristics,
  ObjectFormPhotos,
  ObjectFormRules,
  ObjectFormPricesItem,
} from '@account/add-object/util';
import { ObjectFormStorageService } from './object-form-storage.service';
import { ObjectFormState } from '../types/object-form.models';
import { objectFormEntityToDTOAdapter } from './objectFormEntityToDTO.adapter';
import { ObjectDTO } from '../types/agency-object-dto.models';
import { ApiService } from '@http';

const initialState: ObjectFormState = {
  form: null,
  isNewForm: null,
  isLoading: false,
  isSaving: false,
};

@Injectable({ providedIn: 'root' })
export class ObjectFormStore extends ComponentStore<ObjectFormState> {
  private readonly objectFormStorage = inject(ObjectFormStorageService);
  private readonly fb = inject(FormBuilder);
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);

  public readonly form$: Observable<FormGroup<ObjectForm> | null> = this.select(
    (state: ObjectFormState) => state.form
  ).pipe(
    tap((form: FormGroup<ObjectForm> | null) => {
      if (!form) {
        this.initForm();
      }
    })
  );
  public readonly formState$: Observable<ObjectFormState> = this.select((state: ObjectFormState) => state);
  public readonly isNewForm$: Observable<boolean | null> = this.select((state: ObjectFormState) => state.isNewForm);
  public readonly isLoading$: Observable<boolean> = this.select((state: ObjectFormState) => state.isLoading);
  public readonly isSaving$: Observable<boolean> = this.select((state: ObjectFormState) => state.isSaving);
  public readonly infrastructureForm$: Observable<FormGroup<ObjectFormInfrastructure> | null> = this.select(
    this.form$,
    (form: FormGroup<ObjectForm> | null) => (form?.get('infrastructure') as FormGroup<ObjectFormInfrastructure>) ?? null
  );
  public readonly characteristicsForm$: Observable<FormGroup<ObjectFormCharacteristics> | null> = this.select(
    this.form$,
    (form: FormGroup<ObjectForm> | null) =>
      (form?.get('characteristics') as FormGroup<ObjectFormCharacteristics>) ?? null
  );
  public readonly photosForm$: Observable<FormGroup<ObjectFormPhotos> | null> = this.select(
    this.form$,
    (form: FormGroup<ObjectForm> | null) => (form?.get('photos') as FormGroup<ObjectFormPhotos>) ?? null
  );
  public readonly rulesForm$: Observable<FormGroup<ObjectFormRules> | null> = this.select(
    this.form$,
    (form: FormGroup<ObjectForm> | null) => (form?.get('rules') as FormGroup<ObjectFormRules>) ?? null
  );
  public readonly placementControl$: Observable<FormControl<string> | null> = this.select(
    this.form$,
    (form: FormGroup<ObjectForm> | null) => (form?.get('placement') as FormControl<string>) ?? null
  );
  public readonly pricesForm$: Observable<FormArray<FormGroup<ObjectFormPricesItem>> | null> = this.select(
    this.form$,
    (form: FormGroup<ObjectForm> | null) => (form?.get('prices') as FormArray<FormGroup<ObjectFormPricesItem>>) ?? null
  );
  public readonly servicesArray$: Observable<FormArray<FormControl<string>> | null> = this.select(
    this.form$,
    (form: FormGroup<ObjectForm> | null) => (form?.get('services') as FormArray<FormControl<string>>) ?? null
  );
  public readonly bookingMethodControl$: Observable<FormControl<string> | null> = this.select(
    this.form$,
    (form: FormGroup<ObjectForm> | null) => (form?.get('bookingMethod') as FormControl<string>) ?? null
  );

  constructor() {
    super(initialState);
    this.init();
  }

  public initForm = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() => {
        return this.objectFormStorage.getObjectForm();
      }),
      tap((form: Partial<ObjectEntity> | null) => {
        this.setForm(form);
      })
    )
  );

  public saveForm = this.effect((partForm$: Observable<Partial<ObjectEntity>>) => {
    return partForm$.pipe(
      tap((partForm: Partial<ObjectEntity>) => {
        this.patchState({ isSaving: true });
      }),
      switchMap((partForm: Partial<ObjectEntity>) => {
        return this.objectFormStorage.updateObjectForm(partForm).pipe(
          tap((isUpdated: boolean) => {
            if (isUpdated) {
              this.saveFormSuccess(partForm);
            }
          })
        );
      })
    );
  });

  public destroyForm = this.updater((state: ObjectFormState) => {
    return {
      ...state,
      form: null,
    };
  });

  public publish = this.effect((form$: Observable<ObjectEntity>) =>
    form$.pipe(
      map(
        (object: ObjectEntity): ObjectDTO => ({
          ...objectFormEntityToDTOAdapter.entityToDTO(object),
        })
      ),
      switchMap((object: ObjectDTO) => {
        console.log(object);
        this.patchState({ isLoading: true });
        return this.apiService.post('add-object', object).pipe(
          tap((response) => {
            this.objectFormStorage.removeObjectForm();
            this.router.navigateByUrl('/');
            this.publishFormSuccess();
          }),
          catchError((error) => {
            return of(error);
          })
        );
      })
    )
  );

  private init = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() => this.objectFormStorage.hasObjectForm()),
      tap((hasForm: boolean) => {
        this.setIsNewForm(hasForm);
      })
    )
  );

  private setForm = this.updater((state: ObjectFormState, savedForm: Partial<ObjectEntity> | null) => {
    const form = createObjectForm(this.fb, savedForm);
    return {
      ...state,
      form,
    };
  });

  private publishFormSuccess = this.updater((state: ObjectFormState) => {
    return {
      ...state,
      isLoading: false,
      isNewForm: true,
      form: null,
    };
  });

  private saveFormSuccess = this.updater((state: ObjectFormState, partForm: Partial<ObjectEntity>) => {
    const form = state.form ? state.form : createObjectForm(this.fb, partForm);
    console.log(1);
    return {
      ...state,
      isSaving: false,
      isNewForm: false,
      form: form,
    };
  });

  private setIsNewForm = this.updater((state: ObjectFormState, hasForm: boolean) => {
    return {
      ...state,
      isNewForm: !hasForm,
    };
  });
}
