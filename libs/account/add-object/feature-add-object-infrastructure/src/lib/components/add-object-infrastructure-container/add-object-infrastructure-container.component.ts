import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { filter, Observable } from 'rxjs';

import {
  InfrastructureListFormVM,
  InfrastructureReachesFormVM,
  InfrastructureFormVM,
} from '../../types/infrastructure-form.models';
import { AddObjectInfrastructureListUiComponent } from '../add-object-infrastructure-list-ui/add-object-infrastructure-list-ui.component';
import { AddObjectInfrastructureReachesUiComponent } from '../add-object-infrastructure-reaches-ui/add-object-infrastructure-reaches-ui.component';
import { AddObjectButtonsUiComponent } from '@account/add-object/ui';
import { ObjectFormStore } from '@account/add-object/data-access';
import { ObjectInfrastructureVM } from '../../types/infrastructure.models';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';

@Component({
  selector: 'account-add-object-infrastructure-container',
  standalone: true,
  imports: [
    CommonModule,
    AddObjectInfrastructureListUiComponent,
    ReactiveFormsModule,
    AddObjectInfrastructureReachesUiComponent,
    AddObjectButtonsUiComponent,
    UiIndicatorsLoaderComponent,
  ],
  templateUrl: './add-object-infrastructure-container.component.html',
  styleUrl: './add-object-infrastructure-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectInfrastructureContainerComponent implements OnInit {
  public form!: FormGroup<InfrastructureFormVM>;
  private readonly router = inject(Router);
  private readonly objectFormStore = inject(ObjectFormStore);
  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public readonly isSaving$: Observable<boolean> = this.objectFormStore.isSaving$;

  ngOnInit(): void {
    this.objectFormStore.infrastructureForm$
      .pipe(
        filter((form: FormGroup<InfrastructureFormVM> | null): form is FormGroup<InfrastructureFormVM> =>
          Boolean(form)
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((form: FormGroup<InfrastructureFormVM>) => {
        this.form = form;
        this.changeDetectorRef.detectChanges();
      });
  }

  constructor(title: Title) {
    title.setTitle('Добавить объект');
  }

  get infrastructureList(): InfrastructureListFormVM {
    return {
      places: this.form.get('places') as FormArray,
      leisure: this.form.get('leisure') as FormArray,
      leisureWater: this.form.get('leisureWater') as FormArray,
      leisureActive: this.form.get('leisureActive') as FormArray,
    };
  }

  get infrastructureReaches(): InfrastructureReachesFormVM {
    return {
      reachByPrivateTransport: this.form.get('reachByPrivateTransport') as FormControl,
      reachByPublicTransport: this.form.get('reachByPublicTransport') as FormControl,
    };
  }

  public onNext(): void {
    this.router.navigateByUrl('account/add-object/characteristics');
  }

  public onSave(): void {
    this.objectFormStore.saveForm({ infrastructure: this.form.value as ObjectInfrastructureVM });
  }

  public onDistanceChange(type: string, name: string, distance: string): void {
    const index = (this.form.get(type) as FormArray).controls.findIndex((item) => item.value.name === name);
    if (index === -1) {
      throw Error('Infrastructure item is undefined');
    }
    (this.form.get(type) as FormArray).at(index).patchValue({
      name,
      distance,
    });
  }

  public onAddInfrastructureItem(type: string, name: string): void {
    (this.form.get(type) as FormArray).push(
      new FormGroup({
        name: new FormControl(name, { nonNullable: true }),
        distance: new FormControl('', {
          nonNullable: true,
        }),
      })
    );
  }

  public onRemoveInfrastructureItem(type: string, name: string): void {
    const index = (this.form.get(type) as FormArray).controls.findIndex((item) => item.value.name === name);
    if (index === -1) {
      throw Error('Infrastructure item is undefined');
    }
    (this.form.get(type) as FormArray).removeAt(index);
  }
}
