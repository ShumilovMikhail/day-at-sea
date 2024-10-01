import { MyObjectsVM } from '@account/my-objects/data-access';
import { IncomeObjectDTO, IncomeObjectEntity } from '../types/income-object.models';
import { getDaysSinceCreate } from './getDaysSinceCreate';

export const incomeObjectAdapter = {
  dtoToEntity: (incomes: IncomeObjectDTO[], myObjects: MyObjectsVM): IncomeObjectEntity[] =>
    incomes.map((income) => ({
      id: income.id,
      title: myObjects.find((myObject) => myObject.id == income.agency_object_id)?.title ?? '',
      profit: income.profit,
      totalIncome: income.profit - income.total_cost,
      totalCost: income.total_cost,
      downtime: getDaysSinceCreate(income.created_at) - income.rental_days,
      rentalDays: income.rental_days,
      averageIncome: Math.floor((income.profit - income.total_cost) / 365),
      bookingsCount: income.bookings_count,
    })),
};
