import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { filter, Observable, share } from 'rxjs';

import { ObjectFormPricesItemVM, PricesType } from '../../types/prices-form.models';
import { AddObjectPricesDefaultContainerComponent } from '../add-object-prices-default-container/add-object-prices-default-container.component';
import { ObjectFormStore } from '@account/add-object/data-access';
import { ObjectPricesItemVM } from '../../types/prices.models';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';
import { ObjectEntity } from '@account/add-object/util';

@Component({
  selector: 'account-add-object-prices-container',
  standalone: true,
  imports: [CommonModule, AddObjectPricesDefaultContainerComponent, UiIndicatorsLoaderComponent],
  templateUrl: './add-object-prices-container.component.html',
  styleUrl: './add-object-prices-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectPricesContainerComponent implements OnInit {
  public pricesArray!: PricesType;
  private readonly objectFormStore = inject(ObjectFormStore);
  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public readonly loading$: Observable<boolean> = this.objectFormStore.isLoading$.pipe(share());
  public readonly isSaving$: Observable<boolean> = this.objectFormStore.isSaving$;

  ngOnInit(): void {
    this.objectFormStore.pricesForm$
      .pipe(
        filter((pricesArray: PricesType | null): pricesArray is PricesType => Boolean(pricesArray)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((pricesArray: PricesType) => {
        this.pricesArray = pricesArray;
        this.changeDetectorRef.detectChanges();
      });
  }

  constructor(title: Title) {
    title.setTitle('Добавить объект');
  }

  get defaultPrices(): FormGroup<ObjectFormPricesItemVM> {
    const defaultPrices = this.pricesArray.controls.find((form) => form.get('name')?.value === 'Цены по умолчанию');
    if (!defaultPrices) {
      throw Error('default prices: not found form');
    }
    return defaultPrices;
  }

  public onSave(): void {
    this.objectFormStore.saveForm({ prices: this.pricesArray.value as ObjectPricesItemVM[] });
  }

  public onPublish(): void {
    this.objectFormStore.publish(this.pricesArray?.parent?.value as ObjectEntity);
  }
}
