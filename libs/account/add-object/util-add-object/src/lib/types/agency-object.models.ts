export interface ObjectEntity {
  title: string;
  placement: string;
  address: string;
  infrastructure: ObjectInfrastructure;
  characteristics: ObjectCharacteristics;
  photos: ObjectPhotos;
  rules: ObjectRules;
  services: string[];
  prices: ObjectPricesItem[];
  bookingMethod: string;
}

export interface ObjectInfrastructure {
  places: InfrastructureItem[];
  leisure: InfrastructureItem[];
  leisureWater: InfrastructureItem[];
  leisureActive: InfrastructureItem[];
  reachByPublicTransport: string;
  reachByPrivateTransport: string;
}

export interface InfrastructureItem {
  name: string;
  distance: string;
}

export interface ObjectCharacteristics {
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
  rooms: ObjectRooms;
  waterSupplyType: string;
  amenities: Amenities;
  description: string;
}

export interface ObjectRooms {
  bedrooms: RoomItem[];
  bathrooms: RoomItem[];
}

export interface RoomItem {
  name: string;
  count: number;
}

export interface Amenities {
  flat: string[];
  bathroom: string[];
  kitchen: string[];
  children: string[];
}

export interface ObjectRules {
  arrivalTime: string;
  departureTime: string;
  earlyArrival: boolean;
  lateDeparture: boolean;
  rules: string[];
  paymentCheckIn: string;
  pledge: string;
  freeCancellation: string;
  description: string;
}

export interface ObjectPhotos {
  primaryPhotoIndex: number | null;
  photos: string[];
}

export interface ObjectPricesItem {
  name: string;
  price: string;
  minStay: number;
  discounts: Discounts;
  weekendDiscount: WeekendDiscount;
  additionalGuests: AdditionalGuests;
}

export interface Discounts {
  durationStay: DurationStayDiscountItem[];
  lastMinuteBooking: LastMinuteBookingDiscountItem[];
  earlyBooking: EarlyBookingDiscountItem[];
}

export interface DurationStayDiscountItem {
  durationOver: number;
  discount: string;
  unit: string;
}

export interface EarlyBookingDiscountItem {
  beforeMonths: number;
  discount: string;
  unit: string;
}

export interface LastMinuteBookingDiscountItem {
  beforeDays: number;
  discount: string;
  unit: string;
}

export interface WeekendDiscount {
  price: string;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface AdditionalGuests {
  overGuests: number;
  surcharge: string;
  unit: string;
}
