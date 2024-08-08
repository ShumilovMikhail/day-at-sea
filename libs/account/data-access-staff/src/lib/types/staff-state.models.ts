import { ResponseError } from '@http';
import { StaffEntity } from './staff.models';

export interface StaffState {
  isLoading: boolean;
  error: ResponseError | null;
}
