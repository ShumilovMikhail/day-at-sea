import { MyObjectDTO, MyObjectEntity } from '../types/my-object.models';

export interface MyObjectsDTOAdapter {
  myObjectDTOToEntity: (myObject: MyObjectDTO) => MyObjectEntity;
  myObjectEntityToDTO: (myObject: MyObjectEntity) => MyObjectDTO;
}

export const myObjectsDTOAdapter: MyObjectsDTOAdapter = {
  myObjectDTOToEntity(myObject: MyObjectDTO): MyObjectEntity {
    return {
      id: myObject.id,
      img: myObject.img,
      title: myObject.title,
      address: myObject.address,
      placementType: myObject.placement_type,
      bookingMethod: myObject.booking_method,
      status: myObject.status,
      salesChannelId: myObject.sales_channel,
      guestCount: myObject.guest_count,
    };
  },
  myObjectEntityToDTO(myObject: MyObjectEntity): MyObjectDTO {
    return {
      id: myObject.id,
      img: myObject.img,
      title: myObject.title,
      address: myObject.address,
      placement_type: myObject.placementType,
      booking_method: myObject.bookingMethod,
      status: myObject.status,
      sales_channel: myObject.salesChannelId,
      guest_count: myObject.guestCount,
    };
  },
};
