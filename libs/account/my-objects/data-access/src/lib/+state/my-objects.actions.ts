import { createActionGroup, props } from '@ngrx/store';

import { MyObjectDTO, MyObjectEntity } from '../types/my-object.models';
import { ResponseError } from '@http';

export const myObjectsActions = createActionGroup({
  source: 'MyObjects',
  events: {
    getMyObjects: props<{ agencyId: number }>(),
    updateMyObject: props<{ agencyId: number; id: number; myObject: Omit<MyObjectDTO, 'id'> }>(),
    addMyObject: props<{ myObject: MyObjectEntity }>(),

    getMyObjectsSuccess: props<{ myObjects: MyObjectEntity[] }>(),
    updateMyObjectSuccess: props<{ myObject: MyObjectEntity }>(),

    getMyObjectsFailure: props<{ error: ResponseError }>(),
    updateMyObjectFailure: props<{ error: ResponseError }>(),
  },
});
