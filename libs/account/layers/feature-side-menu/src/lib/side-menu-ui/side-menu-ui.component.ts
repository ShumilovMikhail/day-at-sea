import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface AgencyVM {
  id: number | string;
  name: string;
  photo?: string;
}
@Component({
  selector: 'account-side-menu-ui',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './side-menu-ui.component.html',
  styleUrl: './side-menu-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuUiComponent {
  @Input() agencyVM!: AgencyVM | null;
}
