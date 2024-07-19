import { MyObjectsTableList } from './my-objects-vm.models';

export interface MyObjectsState {
  objects: MyObjectsTableList | null;
  filters: MyObjectsFilters | null;
}

export interface MyObjectsFilters {
  title: string;
  bookingMethod: string;
  price: string;
  salesChannel: string;
  guestCount: string;
}
