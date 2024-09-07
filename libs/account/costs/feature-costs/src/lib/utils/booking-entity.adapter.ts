import { CostEntity } from '@account/costs/data-access';
import { MyObjectVM } from '@ui/forms';
import { CostVM } from '../types/costs.models';
import { XLSXFileData } from '@utils/files';

export const costEntityAdapter = {
  entityToVM: (costs: CostEntity[], myObjects: MyObjectVM[]): CostVM[] => {
    return costs.map((cost) => ({
      id: cost.id,
      expenseItem: cost.expenseItem,
      date: cost.date,
      amount: cost.amount,
      commentary: cost.commentary,
      objects: cost.objectsIds.map((id) => myObjects.find((object) => object.id == id)?.title ?? ''),
    }));
  },
  vmToXLSXFileData: (costs: CostVM[]): XLSXFileData => {
    return costs.map((cost) => ({
      Статья: cost.expenseItem,
      Дата: cost.date,
      Сумма: cost.amount,
      Квартиры: cost.objects.join(', '),
      Комментарий: cost.commentary,
    }));
  },
};
