import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfrastructureDataService } from './services/infrastructure-data.service';
import { AccordionDirective } from '@utils/directives';

@Component({
  selector: 'account-add-object-infrastructure-ui',
  standalone: true,
  imports: [CommonModule, AccordionDirective],
  providers: [InfrastructureDataService],
  templateUrl: './add-object-infrastructure-ui.component.html',
  styleUrl: './add-object-infrastructure-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectInfrastructureUiComponent {
  public readonly data = inject(InfrastructureDataService);
}
