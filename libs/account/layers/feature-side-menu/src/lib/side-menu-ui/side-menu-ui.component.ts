import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface AgencyVM {
  name: string;
  photo?: string;
}
@Component({
  selector: 'account-side-menu-ui',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu-ui.component.html',
  styleUrl: './side-menu-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuUiComponent {
  @Input() agencyVM!: AgencyVM | null;
}
