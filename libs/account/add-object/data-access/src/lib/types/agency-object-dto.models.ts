export interface ObjectDTO {
  title: string;
  placement: string;
  address: string;
  infrastructure: ObjectInfrastructureDTO;
  characteristics: ObjectCharacteristicsDTO;
  photos: ObjectPhotosDTO;
  rules: ObjectRulesDTO;
  services: string[];
  prices: ObjectPricesItemDTO[];
  booking_method: string;
}

export interface ObjectInfrastructureDTO {
  places: InfrastructureItemDTO[];
  leisure: InfrastructureItemDTO[];
  leisure_water: InfrastructureItemDTO[];
  leisure_active: InfrastructureItemDTO[];
  reach_by_public_transport: string;
  reach_by_private_transport: string;
}

export interface InfrastructureItemDTO {
  name: string;
  distance: string;
}

export interface ObjectCharacteristicsDTO {
  placement_type: string;
  square: string;
  floor: string;
  floor_count: string;
  lift: boolean;
  attic: boolean;
  kitchen: string;
  repair: string;
  room_count: number;
  bedroom_count: string;
  guest_count: number | string;
  rooms: ObjectRoomsDTO;
  water_supply_type: string;
  amenities: AmenitiesDTO;
  description: string;
}

export interface ObjectRoomsDTO {
  bedrooms: RoomItemDTO[];
  bathrooms: RoomItemDTO[];
}

export interface RoomItemDTO {
  name: string;
  count: number;
}

export interface AmenitiesDTO {
  flat: string[];
  bathroom: string[];
  kitchen: string[];
  children: string[];
}

export interface ObjectRulesDTO {
  arrival_time: string;
  departure_time: string;
  early_arrival: boolean;
  late_departure: boolean;
  rules: string[];
  payment_check_in: string;
  pledge: string;
  free_cancellation: string;
  description: string;
}

export interface ObjectPhotosDTO {
  primary_photo_index: number | null;
  photos: string[];
}

export interface ObjectPricesItemDTO {
  name: string;
  price: string;
  min_stay: number;
  discounts: DiscountsDTO;
  weekend_discount: WeekendDiscountDTO;
  additional_guests: AdditionalGuestsDTO;
}

export interface DiscountsDTO {
  duration_stay: DurationStayDiscountItemDTO[];
  last_minute_booking: LastMinuteBookingDiscountItemDTO[];
  early_booking: EarlyBookingDiscountItemDTO[];
}

export interface DurationStayDiscountItemDTO {
  duration_over: number;
  discount: string;
  unit: string;
}

export interface EarlyBookingDiscountItemDTO {
  before_months: number;
  discount: string;
  unit: string;
}

export interface LastMinuteBookingDiscountItemDTO {
  before_days: number;
  discount: string;
  unit: string;
}

export interface WeekendDiscountDTO {
  price: string;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface AdditionalGuestsDTO {
  over_guests: number;
  surcharge: string;
  unit: string;
}
