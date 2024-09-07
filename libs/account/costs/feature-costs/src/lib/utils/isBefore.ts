import { stringToDate } from '@utils/functions';

export function isBefore(date: string, untilDate: string): boolean {
  return stringToDate(untilDate).getTime() - stringToDate(date).getTime() > 0;
}
