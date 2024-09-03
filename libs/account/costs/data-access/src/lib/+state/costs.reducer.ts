import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { ResponseError } from '@http';
import { CostDTO, CostEntity, CostsEntity } from '../types/costs.models';
import { CostsState } from '../types/costs-state.models';
import { costsActions } from './costs.actions';

export const costsAdapter: EntityAdapter<CostEntity> = createEntityAdapter<CostEntity>();

export const initialCostsState: CostsState = costsAdapter.getInitialState({
  status: null,
  error: null,
  costsLoaded: false,
});

export const costsFeature = createFeature({
  name: 'Costs',
  reducer: createReducer(
    initialCostsState,
    on(
      costsActions.getCosts,
      (state: CostsState, payload: { agencyId: number }): CostsState => ({
        ...state,
        status: 'loading',
        error: null,
      })
    ),
    on(
      costsActions.getCostsSuccess,
      (state: CostsState, payload: { costs: CostsEntity }): CostsState =>
        costsAdapter.setAll(payload.costs, {
          ...state,
          status: 'loaded',
          costsLoaded: true,
        })
    ),
    on(
      costsActions.getCostsFailure,
      (state: CostsState, payload: { error: ResponseError }): CostsState => ({
        ...state,
        error: payload.error,
        status: 'error',
      })
    ),

    on(
      costsActions.addCost,
      (state: CostsState, payload: { agencyId: number; cost: Omit<CostDTO, 'id'> }): CostsState => ({
        ...state,
        status: 'loading',
        error: null,
      })
    ),
    on(
      costsActions.addCostSuccess,
      (state: CostsState, payload: { cost: CostEntity }): CostsState =>
        costsAdapter.addOne(payload.cost, {
          ...state,
          status: 'loaded',
        })
    ),
    on(
      costsActions.addCostFailure,
      (state: CostsState, payload: { error: ResponseError }): CostsState => ({
        ...state,
        error: payload.error,
        status: 'error',
      })
    ),

    on(
      costsActions.updateCost,
      (state: CostsState, payload: { agencyId: number; cost: CostDTO }): CostsState => ({
        ...state,
        status: 'loading',
        error: null,
      })
    ),
    on(
      costsActions.updateCostSuccess,
      (state: CostsState, payload: { cost: CostEntity }): CostsState =>
        costsAdapter.updateOne(
          { id: payload.cost.id, changes: payload.cost },
          {
            ...state,
            status: 'loaded',
          }
        )
    ),
    on(
      costsActions.updateCostFailure,
      (state: CostsState, payload: { error: ResponseError }): CostsState => ({
        ...state,
        error: payload.error,
        status: 'error',
      })
    ),

    on(
      costsActions.deleteCost,
      (state: CostsState, payload: { agencyId: number; id: number }): CostsState => ({
        ...state,
        status: 'loading',
        error: null,
      })
    ),
    on(
      costsActions.deleteCostSuccess,
      (state: CostsState, payload: { id: number }): CostsState =>
        costsAdapter.removeOne(payload.id, {
          ...state,
          status: 'loaded',
        })
    ),
    on(
      costsActions.deleteCostFailure,
      (state: CostsState, payload: { error: ResponseError }): CostsState => ({
        ...state,
        error: payload.error,
        status: 'error',
      })
    )
  ),
});
