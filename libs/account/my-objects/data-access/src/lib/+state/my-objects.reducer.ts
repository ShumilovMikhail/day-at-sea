import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { MyObjectsState } from '../types/my-objects-state.models';
import { MyObjectDTO, MyObjectEntity, MyObjectsEntity } from '../types/my-object.models';
import { myObjectsActions } from './my-objects.actions';
import { ResponseError } from '@http';

export const myObjectsAdapter: EntityAdapter<MyObjectEntity> = createEntityAdapter<MyObjectEntity>();

export const initialMyObjectsState: MyObjectsState = myObjectsAdapter.getInitialState({
  status: null,
  error: null,
  myObjectsLoaded: false,
});

export const myObjectsFeature = createFeature({
  name: 'MyObjects',
  reducer: createReducer(
    initialMyObjectsState,
    on(
      myObjectsActions.getMyObjects,
      (state: MyObjectsState, payload: { agencyId: number }): MyObjectsState => ({
        ...state,
        status: 'loading',
        error: null,
      })
    ),
    on(
      myObjectsActions.getMyObjectsSuccess,
      (state: MyObjectsState, payload: { myObjects: MyObjectsEntity }): MyObjectsState =>
        myObjectsAdapter.setAll(payload.myObjects, {
          ...state,
          status: 'loaded',
          myObjectsLoaded: true,
        })
    ),
    on(
      myObjectsActions.getMyObjectsFailure,
      (state: MyObjectsState, payload: { error: ResponseError }): MyObjectsState => ({
        ...state,
        error: payload.error,
        status: 'error',
      })
    ),

    on(
      myObjectsActions.addMyObject,
      (state: MyObjectsState, payload: { myObject: MyObjectEntity }): MyObjectsState =>
        myObjectsAdapter.addOne(payload.myObject, state)
    ),

    on(
      myObjectsActions.updateMyObject,
      (state: MyObjectsState, payload: { myObject: Omit<MyObjectDTO, 'id'> }): MyObjectsState => ({
        ...state,
        status: 'loading',
        error: null,
      })
    ),
    on(
      myObjectsActions.updateMyObjectSuccess,
      (state: MyObjectsState, payload: { myObject: MyObjectEntity }): MyObjectsState =>
        myObjectsAdapter.updateOne(
          { id: payload.myObject.id, changes: payload.myObject },
          {
            ...state,
            status: 'loaded',
          }
        )
    ),
    on(
      myObjectsActions.updateMyObjectFailure,
      (state: MyObjectsState, payload: { error: ResponseError }): MyObjectsState => ({
        ...state,
        status: 'error',
        error: payload.error,
      })
    )
  ),
});
