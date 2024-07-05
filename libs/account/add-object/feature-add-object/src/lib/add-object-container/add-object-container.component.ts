import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';

import { AddObjectInfoContainerComponent } from '@account/add-object/feature-add-object-info';
import { FormArrayPipe, FormControlPipe } from '@utils/pipes';
import { AddObjectInfrastructureContainerComponent } from '@account/add-object/feature-add-object-infrastructure';
import {
  ObjectFormCharacteristics,
  ObjectFormInfrastructure,
  ObjectFormPhotos,
  ObjectFormRules,
} from '../types/object-form.models';
import { AddObjectCharacteristicsContainerComponent } from '@account/add-object/feature-add-object-characteristics';
import { AddObjectFormService } from '../services/add-object-form.service';
import { AddObjectPhotosContainerComponent } from '@account/add-object/feature-add-object-photos';
import { AddObjectRulesContainerComponent } from '@account/add-object/feature-add-object-rules';
import { AddObjectServicesContainerComponent } from '@account/add-object/feature-add-object-services';

@Component({
  selector: 'account-add-object-container',
  standalone: true,
  imports: [
    CommonModule,
    AddObjectInfoContainerComponent,
    FormControlPipe,
    FormArrayPipe,
    AddObjectInfrastructureContainerComponent,
    AddObjectCharacteristicsContainerComponent,
    AddObjectPhotosContainerComponent,
    AddObjectRulesContainerComponent,
    AddObjectServicesContainerComponent,
  ],
  templateUrl: './add-object-container.component.html',
  styleUrl: './add-object-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectContainerComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly formService = inject(AddObjectFormService);
  public readonly form = this.formService.form;
  public step: string | null = null;

  public get infrastructureForm(): FormGroup<ObjectFormInfrastructure> {
    return this.form.get('infrastructure') as FormGroup<ObjectFormInfrastructure>;
  }

  public get characteristicsForm(): FormGroup<ObjectFormCharacteristics> {
    return this.form.get('characteristics') as FormGroup<ObjectFormCharacteristics>;
  }

  public get photosForm(): FormGroup<ObjectFormPhotos> {
    return this.form.get('photos') as FormGroup<ObjectFormPhotos>;
  }

  public get rulesForm(): FormGroup<ObjectFormRules> {
    return this.form.get('rules') as FormGroup<ObjectFormRules>;
  }

  constructor(title: Title) {
    title.setTitle('Добавить объект');
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params: Params) => {
      this.step = params['step'];
      this.changeDetectorRef.detectChanges();
    });

    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      console.log(value);
    });
  }
}
