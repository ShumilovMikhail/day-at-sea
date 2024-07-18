import { EntityState } from '@ngrx/entity';

import { ResponseError } from '@http';
import { MyObjectEntity } from './my-object.models';

export interface MyObjectsState extends EntityState<MyObjectEntity> {
  status: MyObjectsStatus | null;
  error: ResponseError | null;
  myObjectsLoaded: boolean;
}

export type MyObjectsStatus = 'loading' | 'loaded' | 'error';
