import { stringToDate } from '@utils/functions';

export function isAfter(date: string, fromDate: string): boolean {
  return stringToDate(fromDate).getTime() - stringToDate(date).getTime() < 0;
}
