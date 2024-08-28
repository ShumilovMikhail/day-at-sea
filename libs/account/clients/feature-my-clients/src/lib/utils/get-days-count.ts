import { stringToDate } from '@utils/functions';

export const getDaysCount = (firstDateString: string, secondDateString: string): number => {
  const DAY_IN_MILLISECONDS = 86400000;
  const firstDate: Date = stringToDate(firstDateString);
  const secondDate: Date = stringToDate(secondDateString);

  return (secondDate.getTime() - firstDate.getTime()) / DAY_IN_MILLISECONDS;
};
