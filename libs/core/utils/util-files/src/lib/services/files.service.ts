import { Injectable } from '@angular/core';

import { CreateFileOptions, FileType, XLSXFileData, XLSXFileOptions } from '../types/files.models';
import { createXLSXFile } from '../functions/create-xlsx-file';

@Injectable({ providedIn: 'root' })
export class FilesService {
  private readonly createFileFunction: { [key: string]: (data: any, options?: CreateFileOptions) => void } = {
    xlsx: createXLSXFile,
  };

  public createFile(data: XLSXFileData, type: 'xlsx', options?: XLSXFileOptions): void;
  public createFile(data: any, type: FileType, options?: CreateFileOptions): void {
    this.createFileFunction[type](data, options);
  }
}
