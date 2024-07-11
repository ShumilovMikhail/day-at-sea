import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, filter, map, Observable, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { ObjectEntity, createObjectForm, ObjectForm } from '@account/add-object/util';
import { LocalStorageObjectFormService } from './local-storage-object-form.service';
import { AgencyFacade } from '@account/data-access-agency';
import { ObjectFormState } from '../types/object-form.models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private readonly objectFormStorage = inject(LocalStorageObjectFormService);
  private readonly agencyFacade = inject(AgencyFacade);
  private readonly fb = inject(FormBuilder);
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly id$: Observable<number> = this.agencyFacade.id$.pipe(
    takeUntilDestroyed(),
    filter((id: number | null): id is number => Boolean(id))
  );

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
        return this.id$;
      }),
      tap((id: number) => {
        this.setForm(id);
      })
    )
  );

  public saveForm = this.effect((partForm$: Observable<Partial<ObjectEntity>>) => {
    return partForm$.pipe(
      withLatestFrom(this.id$),
      tap(([partForm, id]: [Partial<ObjectEntity>, number]) => {
        if (id) {
          this.objectFormStorage.updateObjectForm(id, partForm);
          this.patchState({ isNewForm: false });
        }
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
      withLatestFrom(this.id$),
      map(
        ([object, id]: [ObjectEntity, number]): ObjectDTO => ({
          ...objectFormEntityToDTOAdapter.entityToDTO(object),
          agencies_id: id,
        })
      ),
      switchMap((object: ObjectDTO) => {
        this.patchState({ isLoading: true });
        return this.apiService.post('objects', object).pipe(
          tap((response) => {
            this.patchState({ isLoading: false });
            this.router.navigateByUrl('/');
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
      switchMap(() => {
        return this.id$;
      }),
      tap((id: number) => {
        this.setIsNewForm(id);
      })
    )
  );

  private setForm = this.updater((state: ObjectFormState, id: number) => {
    const savedForm: ObjectEntity | null = this.objectFormStorage.getObjectForm(id);
    const form = createObjectForm(this.fb, savedForm);

    return {
      ...state,
      form,
    };
  });

  private setIsNewForm = this.updater((state: ObjectFormState, id: number) => {
    const hasForm: boolean = this.objectFormStorage.hasObjectForm(id);

    return {
      ...state,
      isNewForm: !hasForm,
    };
  });
}
