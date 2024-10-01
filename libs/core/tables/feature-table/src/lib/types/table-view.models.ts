import { TemplateRef } from '@angular/core';

export interface TableColumnVM {
  name: string;
  title: string;
  position: number;
  color: string;
  class?: string;
  cellClass?: string;
  enabled: boolean;
  width: string;
  projected: TemplateRef<unknown> | null;
}
