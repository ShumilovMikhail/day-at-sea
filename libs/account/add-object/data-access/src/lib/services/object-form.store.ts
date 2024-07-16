import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';

import { ObjectEntity, createObjectForm, ObjectForm } from '@account/add-object/util';
import { ObjectFormStorageService } from './object-form-storage.service';
import { ObjectFormState } from '../types/object-form.models';
import { objectFormEntityToDTOAdapter } from './objectFormEntityToDTO.adapter';
import { ObjectDTO } from '../types/agency-object-dto.models';
import { ApiService } from '@http';
import { Router } from '@angular/router';

const initialState: ObjectFormState = {
  form: null,
  isNewForm: null,
  isLoading: false,
};

@Injectable({ providedIn: 'root' })
export class ObjectFormStore extends ComponentStore<ObjectFormState> {
  private readonly objectFormStorage = inject(ObjectFormStorageService);
  private readonly fb = inject(FormBuilder);
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);

  public readonly form$: Observable<FormGroup<ObjectForm> | null> = this.select((state: ObjectFormState) => state.form);
  public readonly formState$: Observable<ObjectFormState> = this.select((state: ObjectFormState) => state);
  public readonly isNewForm$: Observable<boolean | null> = this.select((state: ObjectFormState) => state.isNewForm);
  public readonly isLoading$: Observable<boolean> = this.select((state: ObjectFormState) => state.isLoading);

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
        this.objectFormStorage.updateObjectForm(partForm);
        this.patchState({ isNewForm: false });
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
      form: null,
    };
  });

  private setIsNewForm = this.updater((state: ObjectFormState, hasForm: boolean) => {
    return {
      ...state,
      isNewForm: !hasForm,
    };
  });
}
