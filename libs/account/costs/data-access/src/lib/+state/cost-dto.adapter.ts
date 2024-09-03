import { CostDTO, CostEntity } from '../types/costs.models';

export interface CostDTOAdapter {
  DTOToEntity: (cost: CostDTO) => CostEntity;
  entityToDTO: (cost: CostEntity) => CostDTO;
}

export const costDTOAdapter: CostDTOAdapter = {
  DTOToEntity(cost: CostDTO): CostEntity {
    return {
      id: cost.id,
      expenseItem: cost.expense_item,
      date: cost.date,
      amount: cost.amount,
      commentary: cost.commentary,
      objectsIds: cost.objects_ids,
    };
  },
  entityToDTO(cost: CostEntity): CostDTO {
    return {
      id: cost.id,
      expense_item: cost.expenseItem,
      date: cost.date,
      amount: cost.amount,
      commentary: cost.commentary,
      objects_ids: cost.objectsIds,
    };
  },
};
