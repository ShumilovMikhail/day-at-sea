import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { LetDirective } from '@ngrx/component';

import { ObjectFormRulesVM } from '../../types/rules-form.models';
import { AddObjectRulesArrivalUiComponent } from '../add-object-rules-arrival-ui/add-object-rules-arrival-ui.component';
import { FormArrayPipe, FormControlPipe } from '@utils/pipes';
import { AddObjectRulesListUiComponent } from '../add-object-rules-list-ui/add-object-rules-list-ui.component';
import { AddObjectRulesBookingUiComponent } from '../add-object-rules-booking-ui/add-object-rules-booking-ui.component';
import { AddObjectRulesDescriptionUiComponent } from '../add-object-rules-description-ui/add-object-rules-description-ui.component';
import { AddObjectButtonsUiComponent } from '@account/add-object/ui';
import { LocalStorageObjectFormService } from '@account/add-object/data-access';
import { ObjectRulesVM } from '../../types/rules.models';

@Component({
  selector: 'account-add-object-rules-container',
  standalone: true,
  imports: [
    CommonModule,
    AddObjectRulesArrivalUiComponent,
    LetDirective,
    FormControlPipe,
    AddObjectRulesListUiComponent,
    FormArrayPipe,
    AddObjectRulesBookingUiComponent,
    AddObjectRulesDescriptionUiComponent,
    AddObjectButtonsUiComponent,
  ],
  templateUrl: './add-object-rules-container.component.html',
  styleUrl: './add-object-rules-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectRulesContainerComponent {
  @Input({ required: true }) form!: FormGroup<ObjectFormRulesVM>;
  private readonly router = inject(Router);
  private readonly objectFormStorageService = inject(LocalStorageObjectFormService);

  public onNext(): void {
    this.router.navigateByUrl('account/add-object/services');
  }

  public onSave(): void {
    this.objectFormStorageService.updateObjectForm({ rules: this.form.value as ObjectRulesVM });
  }
}
