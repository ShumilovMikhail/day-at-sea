export const stringToDate = (string: string): Date => {
  const [day, month, year] = string.split('.');
  return new Date(`${year}-${month}-${day}`);
};
