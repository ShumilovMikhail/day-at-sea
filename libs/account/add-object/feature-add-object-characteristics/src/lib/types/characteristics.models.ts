export interface ObjectCharacteristicsVM {
  placementType: string;
  square: string;
  floor: string;
  floorCount: string;
  lift: boolean;
  attic: boolean;
  kitchen: string;
  repair: string;
  roomCount: number;
  bedroomCount: string;
  guestCount: number | string;
  rooms: ObjectRoomsVM;
  waterSupplyType: string;
  amenities: AmenitiesVM;
  description: string;
}

export interface ObjectRoomsVM {
  bedrooms: RoomItemVM[];
  bathrooms: RoomItemVM[];
}

export interface RoomItemVM {
  name: string;
  count: number;
}

export interface AmenitiesVM {
  flat: string[];
  bathroom: string[];
  kitchen: string[];
  children: string[];
}
