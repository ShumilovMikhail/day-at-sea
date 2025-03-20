import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Signal, effect, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AgencyFacadeSignal, Contacts } from '@account/data-access-agency';
import { ContactsForm, ContactsVM } from '../types/contacts.models';
import { ContactsEditUiComponent } from '../contacts-edit-ui/contacts-edit-ui.component';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';
import { contactsEntityToVM } from './contactsEntityToVM.adapter';
import { siteValidator } from '@utils/validators';
export { contactsEntityToVM } from './contactsEntityToVM.adapter';

@Component({
  selector: 'account-contacts-edit-container',
  standalone: true,
  imports: [CommonModule, ContactsEditUiComponent, UiIndicatorsLoaderComponent],
  templateUrl: './contacts-edit-container.component.html',
  styleUrl: './contacts-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsEditContainerComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly agencyFacade = inject(AgencyFacadeSignal);
  private readonly fb = inject(FormBuilder);
  private readonly contactsVM: Signal<Contacts | null> = this.agencyFacade.contacts;
  private readonly router = inject(Router);
  public form!: FormGroup<ContactsForm>;
  public readonly loading: Signal<boolean> = this.agencyFacade.loading;
  private readonly contactsVMEffect = effect(() => {
    const contactsVM = this.contactsVM();
    if (contactsVM) {
      const contactsEntity = contactsEntityToVM.entityToVM(contactsVM);
      this.initializeForm(contactsEntity);
      this.contactsVMEffect.destroy();
    }
  });

  constructor(private readonly title: Title) {
    title.setTitle('Настройки - Контакты, Сайт, Соцсети, Мессенжеры');
  }

  public onAddPhone(): void {
    this.form.controls.phones.push(new FormControl(''));
  }

  public onDeletePhone(index: number): void {
    this.form.controls.phones.removeAt(index);
  }

  public onSubmit(): void {
    this.agencyFacade.updateContacts(this.form.value as Contacts);
  }

  public onCancel(): void {
    this.router.navigateByUrl('/account/settings');
  }

  private initializeForm(contactsVM: ContactsVM): void {
    this.form = this.fb.group({
      phones: new FormArray(contactsVM.phones.map((phone: string | null) => new FormControl(phone))),
      site: [contactsVM.site],
      vk: [contactsVM.vk, [siteValidator('vk.com', { required: true })]],
      ok: [contactsVM.ok, [siteValidator('ok.ru', { required: false })]],
      whatsapp: [contactsVM.whatsapp],
      telegram: [contactsVM.telegram],
      viber: [contactsVM.viber],
    });
    this.changeDetectorRef.detectChanges();
  }
}
