export const formatDate = (date: Date): string => {
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1; // Месяцы начинаются с 0
  const year: number = date.getFullYear();

  return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
};
