import { utils, writeFileXLSX } from 'xlsx';
import { XLSXFileData, XLSXFileOptions } from '../types/files.models';

export const createXLSXFile = (data: XLSXFileData, options?: XLSXFileOptions): void => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, options?.sheetName ?? 'Data');
  writeFileXLSX(wb, `${options?.name}.xlsx`);
};
