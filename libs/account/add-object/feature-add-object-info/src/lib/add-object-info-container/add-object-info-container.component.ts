import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ObjectTypes } from '../types/object.models';
import { AddObjectInfoTypeUiComponent } from '../add-object-info-type-ui/add-object-info-type-ui.component';
import { AddObjectInfoRoomUiComponent } from '../add-object-info-room-ui/add-object-info-room-ui.component';
import { AddObjectInfoFlatUiComponent } from '../add-object-info-flat-ui/add-object-info-flat-ui.component';
import { AddObjectInfoHouseUiComponent } from '../add-object-info-house-ui/add-object-info-house-ui.component';
import { Router } from '@angular/router';
import { ObjectFormStore } from '@account/add-object/data-access';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-add-object-info-container',
  standalone: true,
  imports: [
    CommonModule,
    AddObjectInfoHouseUiComponent,
    AddObjectInfoFlatUiComponent,
    AddObjectInfoRoomUiComponent,
    AddObjectInfoTypeUiComponent,
    FormControlPipe,
  ],
  templateUrl: './add-object-info-container.component.html',
  styleUrl: './add-object-info-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectInfoContainerComponent {
  private readonly fb = inject(FormBuilder);
  public readonly form = this.fb.nonNullable.group({
    address: ['', [Validators.required]],
    placement: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.minLength(3)]],
  });
  private readonly router = inject(Router);
  private readonly objectFormStore = inject(ObjectFormStore);
  public selectedType: ObjectTypes | null = null;

  public onSelectType(type: ObjectTypes): void {
    this.selectedType = type;
    this.form.get('address')?.patchValue('');
  }

  public onNext(): void {
    this.objectFormStore.saveForm({
      title: this.form.get('title')?.value,
      placement: this.form.get('placement')?.value,
      address: this.form.get('address')?.value,
    });
    this.router.navigate(['/account/add-object/infrastructure']);
  }
}
