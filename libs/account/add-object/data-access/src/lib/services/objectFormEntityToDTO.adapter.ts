import {
  AgencyObject,
  DurationStayDiscountItem,
  EarlyBookingDiscountItem,
  LastMinuteBookingDiscountItem,
  ObjectPricesItem,
} from '@account/add-object/util';
import {
  AgencyObjectDTO,
  DurationStayDiscountItemDTO,
  EarlyBookingDiscountItemDTO,
  LastMinuteBookingDiscountItemDTO,
  ObjectPricesItemDTO,
} from '../types/agency-object-dto.models';

export interface ObjectFormEntityToDTO {
  entityToDTO: (form: AgencyObject) => Omit<AgencyObjectDTO, 'agencies_id'>;
  pricesEntityToDTO: (prices: ObjectPricesItem[]) => ObjectPricesItemDTO[];
}

export const objectFormEntityToDTOAdapter: ObjectFormEntityToDTO = {
  entityToDTO: (form: AgencyObject): Omit<AgencyObjectDTO, 'agencies_id'> => {
    console.log('work');
    return {
      title: form.title,
      placement: form.placement,
      address: form.address,
      infrastructure: {
        places: form.infrastructure.places,
        leisure: form.infrastructure.leisure,
        leisure_water: form.infrastructure.leisureWater,
        leisure_active: form.infrastructure.leisureActive,
        reach_by_public_transport: form.infrastructure.reachByPublicTransport,
        reach_by_private_transport: form.infrastructure.reachByPrivateTransport,
      },
      characteristics: {
        placement_type: form.characteristics.placementType,
        square: form.characteristics.square,
        floor: form.characteristics.floor,
        floor_count: form.characteristics.floorCount,
        lift: form.characteristics.lift,
        attic: form.characteristics.attic,
        kitchen: form.characteristics.kitchen,
        repair: form.characteristics.repair,
        room_count: form.characteristics.roomCount,
        bedroom_count: form.characteristics.bedroomCount,
        guest_count: form.characteristics.guestCount,
        rooms: form.characteristics.rooms,
        water_supply_type: form.characteristics.waterSupplyType,
        amenities: form.characteristics.amenities,
        description: form.characteristics.description,
      },
      photos: {
        primary_photo_index: form.photos.primaryPhotoIndex,
        photos: form.photos.photos,
      },
      rules: {
        arrival_time: form.rules.arrivalTime,
        departure_time: form.rules.departureTime,
        early_arrival: form.rules.earlyArrival,
        late_departure: form.rules.lateDeparture,
        rules: form.rules.rules,
        payment_check_in: form.rules.paymentCheckIn,
        pledge: form.rules.pledge,
        free_cancellation: form.rules.freeCancellation,
        description: form.rules.description,
      },
      services: form.services,
      prices: [],
    };
  },
  pricesEntityToDTO: (prices: ObjectPricesItem[]): ObjectPricesItemDTO[] => {
    return prices.map((priceItem: ObjectPricesItem): ObjectPricesItemDTO => {
      return {
        name: priceItem.name,
        price: priceItem.price,
        min_stay: priceItem.minStay,
        discounts: {
          duration_stay: priceItem.discounts.durationStay.map(
            (durationStay: DurationStayDiscountItem): DurationStayDiscountItemDTO => {
              return {
                duration_over: durationStay.durationOver,
                discount: durationStay.discount,
                unit: durationStay.unit,
              };
            }
          ),
          last_minute_booking: priceItem.discounts.lastMinuteBooking.map(
            (lastMinuteBooking: LastMinuteBookingDiscountItem): LastMinuteBookingDiscountItemDTO => {
              return {
                before_days: lastMinuteBooking.beforeDays,
                discount: lastMinuteBooking.discount,
                unit: lastMinuteBooking.unit,
              };
            }
          ),
          early_booking: priceItem.discounts.earlyBooking.map(
            (earlyBooking: EarlyBookingDiscountItem): EarlyBookingDiscountItemDTO => {
              return {
                before_months: earlyBooking.beforeMonths,
                discount: earlyBooking.discount,
                unit: earlyBooking.unit,
              };
            }
          ),
        },
        weekend_discount: priceItem.weekendDiscount,
        additional_guests: {
          over_guests: priceItem.additionalGuests.overGuests,
          surcharge: priceItem.additionalGuests.surcharge,
          unit: priceItem.additionalGuests.unit,
        },
        on_request: priceItem.onRequest,
        instant: priceItem.instant,
      };
    });
  },
};
