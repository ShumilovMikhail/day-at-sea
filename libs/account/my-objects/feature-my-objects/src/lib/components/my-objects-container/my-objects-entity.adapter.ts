import { XLSXFileData } from '@utils/files';
import { MyObjectsTableList, MyObjectsVM, MyObjectTableItem, MyObjectVM } from '../../types/my-objects-vm.models';
import { getPriceToday } from '@account/my-objects/util-my-objects';

export const myObjectsEntityAdapter = {
  entityToVM: (myObjects: MyObjectsVM): MyObjectsTableList => {
    return myObjects.map(
      (myObject: MyObjectVM): MyObjectTableItem => ({
        id: myObject.id,
        img: myObject.img,
        title: myObject.title,
        address: myObject.address,
        placementType: myObject.placementType,
        bookingMethod: myObject.bookingMethod,
        status: myObject.status,
        salesChannel: myObject.salesChannel,
        guestCount: myObject.guestCount,
        price: getPriceToday(myObject.prices),
      })
    );
  },

  VMToExcelData: (tableList: MyObjectsTableList): XLSXFileData => {
    return tableList.map((tableItem) => {
      return {
        Название: tableItem.title,
        Адресс: tableItem.address,
        'Тип помещения': tableItem.placementType,
        'Метод бронирования': tableItem.bookingMethod,
        Статус: tableItem.status,
        'Канал продаж': tableItem.salesChannel,
        'Количество гостей': tableItem.guestCount,
        Цена: tableItem.price,
      };
    });
  },
};
