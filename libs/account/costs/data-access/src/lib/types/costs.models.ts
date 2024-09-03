export type CostsEntity = CostEntity[];
export type CostsDTO = CostDTO[];

export interface CostDTO {
  id: number;
  expense_item: string;
  date: string;
  amount: number;
  commentary: string;
  objects_ids: number[];
}

export interface CostEntity {
  id: number;
  expenseItem: string;
  date: string;
  amount: number;
  commentary: string;
  objectsIds: number[];
}
