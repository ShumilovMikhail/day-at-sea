import { EntityState } from '@ngrx/entity';

import { CostEntity } from './costs.models';
import { ResponseError } from '@http';

export interface CostsState extends EntityState<CostEntity> {
  status: CostsStateStatus | null;
  error: ResponseError | null;
  costsLoaded: boolean;
}

export type CostsStateStatus = 'loading' | 'loaded' | 'error';
