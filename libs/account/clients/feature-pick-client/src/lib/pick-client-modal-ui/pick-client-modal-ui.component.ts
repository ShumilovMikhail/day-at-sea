import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from '@layers';
import { ClientVM } from '../types/clients.models';
import { AccordionDirective } from '@utils/directives';

@Component({
  selector: 'account-pick-client-modal-ui',
  standalone: true,
  imports: [CommonModule, ModalComponent, AccordionDirective],
  templateUrl: './pick-client-modal-ui.component.html',
  styleUrl: './pick-client-modal-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickClientModalUiComponent {
  @Output() closeEvent = new EventEmitter<void>();
  @Output() pickClientEvent = new EventEmitter<number>();
  @Input({ required: true }) clients!: ClientVM[];
  @Input() isMobile = false;

  public onClose(): void {
    this.closeEvent.emit();
  }

  public onPickClient(id: number): void {
    this.pickClientEvent.emit(id);
  }
}
