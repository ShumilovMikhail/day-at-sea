export interface DateAdapter {
  stringToDate: (string: string) => Date;
}

export const dateAdapter = {
  stringToDate: (string: string): Date => {
    const [day, month, year] = string.split('.');
    return new Date(`${year}-${month}-${day}`);
  },
};
