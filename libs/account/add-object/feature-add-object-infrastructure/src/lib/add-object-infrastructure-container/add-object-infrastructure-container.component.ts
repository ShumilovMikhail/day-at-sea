import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { InfrastructureVM } from '../types/infrastructure.models';
import { AddObjectInfrastructureUiComponent } from '../add-object-infrastructure-ui/add-object-infrastructure-ui.component';
import { Router } from '@angular/router';

@Component({
  selector: 'account-add-object-infrastructure-container',
  standalone: true,
  imports: [CommonModule, AddObjectInfrastructureUiComponent],
  templateUrl: './add-object-infrastructure-container.component.html',
  styleUrl: './add-object-infrastructure-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectInfrastructureContainerComponent {
  @Input({ required: true }) form!: FormGroup<InfrastructureVM>;
  private readonly router = inject(Router);

  public onNext(): void {
    this.router.navigateByUrl('account/add-object/characteristics');
  }
}
