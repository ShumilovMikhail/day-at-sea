import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InfrastructureReachesFormVM } from '../../types/infrastructure-form.models';

@Component({
  selector: 'account-add-object-infrastructure-reaches-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-object-infrastructure-reaches-ui.component.html',
  styleUrl: './add-object-infrastructure-reaches-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectInfrastructureReachesUiComponent {
  @Input({ required: true }) reaches!: InfrastructureReachesFormVM;
}
