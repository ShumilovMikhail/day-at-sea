export interface CreateFileOptions {
  name?: string;
}

export type FileType = 'xlsx';

export type XLSXFileData = XLSXFileRowData[];

export interface XLSXFileRowData {
  [key: string]: string | number;
}

export interface XLSXFileOptions extends CreateFileOptions {
  sheetName?: string;
}
