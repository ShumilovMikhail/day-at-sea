import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickClientModalUiComponent } from '../pick-client-modal-ui/pick-client-modal-ui.component';
import { ClientEntity, ClientsFacade } from '@account/clients/data-access';
import { Observable, take } from 'rxjs';
import { IsMobileDirective } from '@utils/directives';

@Component({
  selector: 'account-pick-client-container',
  standalone: true,
  imports: [CommonModule, PickClientModalUiComponent, IsMobileDirective],
  templateUrl: './pick-client-container.component.html',
  styleUrl: './pick-client-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickClientContainerComponent {
  @Output() pickClientEvent = new EventEmitter<ClientEntity>();
  private readonly clientsFacade = inject(ClientsFacade);
  public readonly clientsEntity$: Observable<ClientEntity[]> = this.clientsFacade.clients$;
  public modalOpen = false;
  public isMobile = false;

  public onToggleModal(isOpen: boolean): void {
    this.modalOpen = isOpen;
  }

  public onIsMobileChange(isMobile: boolean): void {
    this.isMobile = isMobile;
  }

  public onPickClient(id: number): void {
    this.clientsEntity$.pipe(take(1)).subscribe((clients) => {
      const client: ClientEntity | undefined = clients.find((client) => client.id === id);
      if (!client) throw Error('onPickClient: client not found');
      this.pickClientEvent.emit(client);
      this.modalOpen = false;
    });
  }
}
