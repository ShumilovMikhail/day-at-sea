import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComponentStore } from '@ngrx/component-store';
import { filter, Observable, switchMap, tap } from 'rxjs';

import { AgencyObject, createObjectForm, ObjectForm } from '@account/add-object/util';
import { LocalStorageObjectFormService } from './local-storage-object-form.service';
import { AgencyFacade } from '@account/data-access-agency';

export interface ObjectFormState {
  form: FormGroup<ObjectForm> | null;
}

const initialState: ObjectFormState = {
  form: null,
};

@Injectable()
export class ObjectFormStore extends ComponentStore<ObjectFormState> {
  private readonly objectFormStorage = inject(LocalStorageObjectFormService);
  private readonly agencyFacade = inject(AgencyFacade);
  private readonly fb = inject(FormBuilder);
  public readonly form$: Observable<FormGroup<ObjectForm> | null> = this.select((state: ObjectFormState) => state.form);
  private id: number | null = null;

  constructor() {
    super(initialState);
  }

  public init = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() => {
        return this.agencyFacade.id$.pipe(
          filter((id: number | null): id is number => Boolean(id)),
          tap((id: number) => {
            this.id = id;
            this.initForm(id);
          })
        );
      })
    )
  );

  public saveForm = this.effect((partForm$: Observable<Partial<AgencyObject>>) => {
    return partForm$.pipe(
      tap((partForm: Partial<AgencyObject>) => {
        if (this.id) {
          this.objectFormStorage.updateObjectForm(this.id, partForm);
        }
      })
    );
  });

  private initForm = this.updater((state: ObjectFormState, id: number) => {
    const savedForm: AgencyObject | null = this.objectFormStorage.getObjectForm(id);
    const form = createObjectForm(this.fb, savedForm);
    this.patchState({ form });
    if (!savedForm) {
      this.objectFormStorage.setObjectForm(id, form.value as AgencyObject);
    }

    return {
      ...state,
      form,
    };
  });
}
