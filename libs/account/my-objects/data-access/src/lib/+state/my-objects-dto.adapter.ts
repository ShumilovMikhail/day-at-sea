import {
  MyObjectDTO,
  MyObjectEntity,
  MyObjectPricesDTO,
  MyObjectPricesEntity,
  MyObjectStatusDTO,
  MyObjectStatusEntity,
} from '../types/my-object.models';

export interface MyObjectsDTOAdapter {
  DTOToEntity: (myObject: MyObjectDTO) => MyObjectEntity;
  entityToDTO: (myObject: MyObjectEntity) => MyObjectDTO;
}

const statusTypesDTO = {
  active: 'активное',
  inactive: 'не активное',
};

export const myObjectsStatusDTOAdapter = (status: MyObjectStatusDTO): MyObjectStatusEntity => {
  return statusTypesDTO[status] as MyObjectStatusEntity;
};

const statusTypesEntity = {
  активное: 'active',
  'не активное': 'inactive',
};

export const myObjectsStatusEntityAdapter = (status: MyObjectStatusEntity): MyObjectStatusDTO => {
  return statusTypesEntity[status as keyof typeof statusTypesEntity] as MyObjectStatusDTO;
};

export const myObjectsDTOAdapter: MyObjectsDTOAdapter = {
  DTOToEntity(myObject: MyObjectDTO): MyObjectEntity {
    return {
      id: myObject.id,
      img: myObject.img,
      title: myObject.title,
      address: myObject.address,
      placementType: myObject.placement_type,
      bookingMethod: myObject.booking_method,
      status: myObjectsStatusDTOAdapter(myObject.status),
      salesChannelId: myObject.sales_channel,
      guestCount: myObject.guest_count,
      prices: myObject.prices.map(
        (pricesItem: MyObjectPricesDTO): MyObjectPricesEntity => ({
          price: pricesItem.price,
          weekendDiscount: pricesItem.weekend_discount,
        })
      ),
    };
  },
  entityToDTO(myObject: MyObjectEntity): MyObjectDTO {
    return {
      id: myObject.id,
      img: myObject.img,
      title: myObject.title,
      address: myObject.address,
      placement_type: myObject.placementType,
      booking_method: myObject.bookingMethod,
      status: myObjectsStatusEntityAdapter(myObject.status),
      sales_channel: myObject.salesChannelId,
      guest_count: myObject.guestCount,
      prices: myObject.prices.map(
        (pricesItem: MyObjectPricesEntity): MyObjectPricesDTO => ({
          price: pricesItem.price,
          weekend_discount: pricesItem.weekendDiscount,
        })
      ),
    };
  },
};
