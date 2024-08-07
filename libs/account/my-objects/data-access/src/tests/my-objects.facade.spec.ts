import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { MyObjectsFacade } from '../lib/services/my-objects.facade';
import { Store } from '@ngrx/store';
import { AgencyFacade } from '@account/data-access-agency';
import { MyObjectEntity } from '../lib/types/my-object.models';
import { myObjectsDTOAdapter } from '../lib/+state/my-objects-dto.adapter';
import { of } from 'rxjs';

describe('MyObjectsFacade', () => {
  let myObjectsFacade: MyObjectsFacade;
  let fakeStore: MockStore;
  const fakeAgencyFacade = {
    id$: of(1),
  };
  const initialState = {
    status: null,
    error: null,
    myObjectsLoaded: false,
    ids: [],
    entities: {},
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MyObjectsFacade,
        provideMockStore({
          initialState,
        }),
        {
          provide: AgencyFacade,
          useValue: fakeAgencyFacade,
        },
      ],
    });
    fakeStore = TestBed.inject(MockStore);
    jest.spyOn(fakeStore, 'dispatch');
    myObjectsFacade = TestBed.inject(MyObjectsFacade);
  });

  it('MyObjectsFacade: should be created', () => {
    expect(myObjectsFacade).toBeDefined();
  });

  it('addObject: should dispatch addMyobject action with data', () => {
    myObjectsFacade.addObject({} as MyObjectEntity);
    expect(fakeStore.dispatch).toHaveBeenCalledWith({
      type: '[MyObjects] addMyObject',
      myObject: {},
    });
  });

  // public updateMyObject(myObject: MyObjectEntity): void {
  //   this.agencyFacade.id$
  //     .pipe(
  //       filter((id: number | null): id is number => Boolean(id)),
  //       take(1)
  //     )
  //     .subscribe((agencyId: number) => {
  //       const id = myObject.id;
  //       const myObjectDTO = myObjectsDTOAdapter.entityToDTO(myObject);
  //       this.store.dispatch(myObjectsActions.updateMyObject({ agencyId, id, myObject: myObjectDTO }));
  //     });
  // }

  it('updateMyObject: should dispatch updateMyObject action with data dto', () => {
    const myObject = {
      id: 2,
      img: '',
      title: '',
      address: '',
      placementType: '',
      bookingMethod: '',
      status: 'активное',
      salesChannelId: null,
      guestCount: '',
      prices: [],
    };
    myObjectsFacade.updateMyObject(myObject as MyObjectEntity);
    expect(fakeStore.dispatch).toHaveBeenCalledWith({
      type: '[MyObjects] updateMyObject',
      agencyId: 1,
      id: 2,
      myObject: myObjectsDTOAdapter.entityToDTO(myObject as MyObjectEntity),
    });
  });
});
