import { AgencyFacade } from '../lib/services/agency.facade';
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectAgency } from '../lib/+state/agency.selectors';
import { AgencyEntity, Contacts } from '../lib/types/agency.models';

describe('AgencyFacade', () => {
  let agencyFacade: AgencyFacade;
  let fakeStore: MockStore;
  const initialState = {
    status: null,
    agency: null,
    error: null,
  };
  const mockContacts: Contacts = {
    phones: [''],
    site: '',
    vk: '',
    ok: '',
    whatsapp: '',
    telegram: '',
    viber: '',
  };
  const mockRequisites = {
    name: '',
    contactPerson: '',
    city: '',
    phone: '',
    logo: '',
  };
  const mockRequisitesDTO = {
    name: '',
    contact_person: '',
    city: '',
    phone: '',
    logo: '',
  };
  const mockAgency: AgencyEntity = {
    id: 2,
    contacts: mockContacts,
    salesChannels: [],
    ...mockRequisites,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AgencyFacade,
        provideMockStore({
          initialState,
        }),
      ],
    });
    agencyFacade = TestBed.inject(AgencyFacade);
    fakeStore = TestBed.inject(MockStore);
    fakeStore.resetSelectors();
    jest.spyOn(fakeStore, 'dispatch');
  });

  it('AgencyFacade: should be created', () => {
    expect(agencyFacade).toBeDefined();
  });

  it('updateContacts: should throw Error if agency is null', () => {
    agencyFacade.updateContacts(mockContacts);
    expect(agencyFacade.updateContacts).toThrow(Error);
  });

  it('updateContacts: should dispatch [Agency] updateAgencyContacts if agency is exist', () => {
    fakeStore.overrideSelector(selectAgency, mockAgency);
    agencyFacade.updateContacts(mockContacts);
    expect(fakeStore.dispatch).toHaveBeenCalledWith({
      type: '[Agency] updateAgencyContacts',
      id: 2,
      contacts: mockContacts,
    });
  });

  it('updateRequisites: should throw Error if agency is null', () => {
    agencyFacade.updateRequisites(mockRequisites);
    expect(agencyFacade.updateContacts).toThrow(Error);
  });

  it('updateRequisites: should dispatch [Agency] updateAgencyRequisites if agency is exist and transform requisites to requisitesDTO', () => {
    fakeStore.overrideSelector(selectAgency, mockAgency);
    agencyFacade.updateRequisites(mockRequisites);
    expect(fakeStore.dispatch).toHaveBeenCalledWith({
      type: '[Agency] updateAgencyRequisites',
      id: 2,
      requisites: mockRequisitesDTO,
    });
  });

  it('addSalesChannels: should throw Error if agency is null', () => {
    agencyFacade.updateRequisites(mockRequisites);
    expect(agencyFacade.updateContacts).toThrow(Error);
  });

  it('updateRequisites: should dispatch [Agency] updateAgencyRequisites if agency is exist and transform requisites to requisitesDTO', () => {
    fakeStore.overrideSelector(selectAgency, mockAgency);
    agencyFacade.updateRequisites(mockRequisites);
    expect(fakeStore.dispatch).toHaveBeenCalledWith({
      type: '[Agency] updateAgencyRequisites',
      id: 2,
      requisites: mockRequisitesDTO,
    });
  });
});
