export const getFileExtension = (base64String: string): string => {
  const startIndex = base64String.indexOf('data:image/') + 'data:image/'.length;
  const endIndex = base64String.indexOf(';', startIndex);
  return base64String.substring(startIndex, endIndex);
};
