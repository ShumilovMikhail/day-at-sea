export const getDaysSinceCreate = (createdAt: string): number => {
  const nowDate = new Date();
  const createdDate = new Date(createdAt.split('T')[0]);
  return Math.floor((nowDate.getTime() - createdDate.getTime()) / 86400000);
};
