import { ResponseError } from '@http';

export interface StaffState {
  isLoading: boolean;
  error: ResponseError | null;
  status: StaffStatusTypes;
}

export type StaffStatusTypes = 'init' | 'loading' | 'loaded';
