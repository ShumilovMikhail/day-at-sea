import { CostDTO, CostEntity } from '../types/costs.models';

export interface CostDTOAdapter {
  DTOToEntity: (cost: CostDTO | Omit<CostDTO, 'id'>) => CostEntity | Omit<CostEntity, 'id'>;
  entityToDTO: (cost: CostEntity | Omit<CostEntity, 'id'>) => CostDTO | Omit<CostDTO, 'id'>;
}

export const costDTOAdapter: CostDTOAdapter = {
  DTOToEntity(cost: CostDTO | Omit<CostDTO, 'id'>): CostEntity | Omit<CostEntity, 'id'> {
    const costEntity = {
      expenseItem: cost.expense_item,
      date: cost.date,
      amount: cost.amount,
      commentary: cost.commentary,
      objectsIds: cost.objects_ids,
    };
    // @ts-expect-error: should
    if (cost.id) costEntity.id = cost.id;
    return costEntity;
  },
  entityToDTO(cost: CostEntity | Omit<CostEntity, 'id'>): CostDTO | Omit<CostDTO, 'id'> {
    const costDTO = {
      expense_item: cost.expenseItem,
      date: cost.date,
      amount: cost.amount,
      commentary: cost.commentary,
      objects_ids: cost.objectsIds,
    };
    // @ts-expect-error: should
    if (cost.id) costDTO.id = cost.id;
    return costDTO;
  },
};
