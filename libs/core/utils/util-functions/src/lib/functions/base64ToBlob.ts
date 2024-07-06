export const base64ToBlob = (base64: string): Blob => {
  const contentType = 'image/png';
  console.log(base64);
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    byteArrays.push(new Uint8Array([...slice].map((char) => char.charCodeAt(0))));
  }

  return new Blob(byteArrays, { type: contentType });
};
