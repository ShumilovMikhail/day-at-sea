const statusTypes = {
  active: 'активное',
  inactive: 'не активное',
};

export const myObjectsStatusAdapter = (status: keyof typeof statusTypes) => {
  return statusTypes[status];
};
