import { inject, Injectable } from '@angular/core';

import { ObjectEntity } from '@account/add-object/util';
import { StorageFacade } from '@storage/data-access-storage';
import { filter, Observable, take } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ObjectFormStorageService {
  private readonly formKey = 'add-object-form';
  private readonly storageFacade = inject(StorageFacade);

  public hasObjectForm(): Observable<boolean> {
    return this.storageFacade.isExistKey(this.formKey, { method: 'remote' });
  }

  public setObjectForm(form: ObjectEntity): void {
    this.storageFacade.setItem(this.formKey, form, { method: 'remote' });
  }

  public getObjectForm(): Observable<ObjectEntity | null> {
    return this.storageFacade.getItem(this.formKey, { method: 'remote' });
  }

  public updateObjectForm(partForm: Partial<ObjectEntity>): void {
    this.storageFacade
      .getItem<Partial<ObjectEntity>>(this.formKey, { method: 'remote' })
      .pipe(take(1))
      .subscribe((form: Partial<ObjectEntity> | null) => {
        this.storageFacade
          .setItem(this.formKey, { ...form, ...partForm }, { method: 'remote' })
          .pipe(
            filter((isUpdate: boolean) => isUpdate),
            take(1)
          )
          .subscribe(() => true);
      });
  }

  public removeObjectForm(): void {
    this.storageFacade.removeItem(this.formKey, { method: 'remote' }).subscribe(() => true);
  }
}
