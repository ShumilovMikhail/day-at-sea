import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl } from '@angular/forms';
import { filter, Observable } from 'rxjs';

import { AddObjectButtonsUiComponent } from '@account/add-object/ui';
import { AddObjectServicesListUiComponent } from '../add-object-services-list-ui/add-object-services-list-ui.component';
import { ObjectFormStore } from '@account/add-object/data-access';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';

@Component({
  selector: 'account-add-object-services-container',
  standalone: true,
  imports: [CommonModule, AddObjectButtonsUiComponent, AddObjectServicesListUiComponent, UiIndicatorsLoaderComponent],
  templateUrl: './add-object-services-container.component.html',
  styleUrl: './add-object-services-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectServicesContainerComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly objectFormStore = inject(ObjectFormStore);
  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public readonly isSaving$: Observable<boolean> = this.objectFormStore.isSaving$;
  public servicesArray!: FormArray<FormControl<string>>;

  ngOnInit(): void {
    this.objectFormStore.servicesArray$
      .pipe(
        filter(
          (servicesArray: FormArray<FormControl<string>> | null): servicesArray is FormArray<FormControl<string>> =>
            Boolean(servicesArray)
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((servicesArray: FormArray<FormControl<string>>) => {
        this.servicesArray = servicesArray;
        this.changeDetectorRef.detectChanges();
      });
  }

  constructor(title: Title) {
    title.setTitle('Добавить объект');
  }

  public onNext(): void {
    this.router.navigateByUrl('account/add-object/prices');
  }

  public onSave(): void {
    this.objectFormStore.saveForm({ services: this.servicesArray.value });
  }

  public onAddService(service: string): void {
    this.servicesArray.push(new FormControl(service) as FormControl<string>);
  }

  public onRemoveService(service: string): void {
    const index = this.servicesArray.controls.findIndex((control) => control.value === service);
    if (index === -1) {
      throw Error('form services list: the service is not on the list');
    }
    this.servicesArray.removeAt(index);
  }
}
