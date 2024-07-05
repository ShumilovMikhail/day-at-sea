import { Injectable } from '@angular/core';

@Injectable()
export class RulesListService {
  public readonly list: string[] = [
    'Можно с детьми',
    'Можно с животными',
    'Можно с животными за доп. оплату',
    'Можно курить',
    'Для мероприятий',
    'Для романтических встреч',
    'Разрешено для шумных компаний',
    'Без залога',
    'Только для иногородних',
  ];
}
