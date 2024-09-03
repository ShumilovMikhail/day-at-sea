import { createActionGroup, props } from '@ngrx/store';

import { ResponseError } from '@http';
import { CostDTO, CostEntity, CostsEntity } from '../types/costs.models';

export const costsActions = createActionGroup({
  source: 'Costs',
  events: {
    getCosts: props<{ agencyId: number }>(),
    updateCost: props<{ agencyId: number; cost: CostDTO }>(),
    addCost: props<{ agencyId: number; cost: Omit<CostDTO, 'id'> }>(),
    deleteCost: props<{ agencyId: number; id: number }>(),

    getCostsSuccess: props<{ costs: CostsEntity }>(),
    updateCostSuccess: props<{ cost: CostEntity }>(),
    addCostSuccess: props<{ cost: CostEntity }>(),
    deleteCostSuccess: props<{ id: number }>(),

    getCostsFailure: props<{ error: ResponseError }>(),
    updateCostFailure: props<{ error: ResponseError }>(),
    addCostFailure: props<{ error: ResponseError }>(),
    deleteCostFailure: props<{ error: ResponseError }>(),
  },
});
