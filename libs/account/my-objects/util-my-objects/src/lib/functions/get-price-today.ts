import { PricesVM } from '../types/prices-vm.models';

export const getPriceToday = (prices: PricesVM[]) => {
  const todaySeasonPrices = prices[0];
  const weekday: string = new Date().toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
  const getWeekendPrice =
    todaySeasonPrices.weekendDiscount[weekday as keyof typeof todaySeasonPrices.weekendDiscount] ?? false;
  return getWeekendPrice ? todaySeasonPrices.weekendDiscount.price : todaySeasonPrices.price;
};
