import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { AddObjectCharacteristicsUiComponent } from '../add-object-characteristics-ui/add-object-characteristics-ui.component';
import { CharacteristicsVM } from '../../types/characteristics.models';

@Component({
  selector: 'account-add-object-characteristics-container',
  standalone: true,
  imports: [CommonModule, AddObjectCharacteristicsUiComponent],
  templateUrl: './add-object-characteristics-container.component.html',
  styleUrl: './add-object-characteristics-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectCharacteristicsContainerComponent {
  @Input({ required: true }) placementControl!: FormControl<string>;
  @Input({ required: true }) form!: FormGroup<CharacteristicsVM>;
  private readonly router = inject(Router);

  public onNext(): void {
    this.router.navigateByUrl('account/add-object/photos');
  }
}
