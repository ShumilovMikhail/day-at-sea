import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavItem } from './types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'layers-side-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
  @Input() navList!: NavItem[];
}
