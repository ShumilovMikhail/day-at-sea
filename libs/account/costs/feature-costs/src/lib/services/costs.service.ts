import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, combineLatestWith, map, Observable, Subject } from 'rxjs';

import { CostVM } from '../types/costs.models';
import { isAfter } from '../utils/isAfter';
import { isBefore } from '../utils/isBefore';
import { MyObjectsFacade, MyObjectVM } from '@account/my-objects/data-access';
import { CostEntity, CostsFacade } from '@account/costs/data-access';
import { CostsFilters } from '../types/filters.models';
import { costEntityAdapter } from '../utils/booking-entity.adapter';

const filtersFunctions = {
  objectTitle: (costs: CostVM[], { objectTitle }: { objectTitle: string }) =>
    objectTitle !== ''
      ? costs.filter(
          (cost) => cost.objects.findIndex((object) => object.toLowerCase().includes(objectTitle.toLowerCase())) !== -1
        )
      : costs,
  expenseItem: (costs: CostVM[], { expenseItem }: { expenseItem: string }) =>
    expenseItem !== ''
      ? costs.filter((cost) => cost.expenseItem.toLowerCase().includes(expenseItem.toLowerCase()))
      : costs,
  from: (costs: CostVM[], { from }: { from: string }) =>
    from !== '' ? costs.filter((cost) => isAfter(cost.date, from)) : costs,
  until: (costs: CostVM[], { until }: { until: string }) =>
    until !== '' ? costs.filter((cost) => isBefore(cost.date, until)) : costs,
};

@Injectable()
export class CostsService {
  private readonly costsFacade = inject(CostsFacade);
  private readonly myObjectsFacade = inject(MyObjectsFacade);
  private readonly costsEntity$: Observable<CostEntity[]> = this.costsFacade.costs$;
  private readonly filters$: Subject<CostsFilters | null> = new BehaviorSubject<CostsFilters | null>(null);

  public readonly costsWithFilters$ = combineLatest([this.costsEntity$, this.filters$]).pipe(
    combineLatestWith(this.myObjectsFacade.myObjectsVM$),
    map(
      ([[costs, filters], myObjects]: [[CostEntity[], CostsFilters | null], MyObjectVM[]]): [
        CostVM[],
        CostsFilters | null
      ] => {
        return [costEntityAdapter.entityToVM(costs, myObjects), filters];
      }
    ),
    map(([costs, filters]: [CostVM[], CostsFilters | null]) => {
      return this.applyFilters(costs, filters);
    })
  );

  public setFilters(filters: CostsFilters): void {
    this.filters$.next(filters);
  }

  private applyFilters(costs: CostVM[], filters: CostsFilters | null): CostVM[] {
    if (!filters) {
      return costs;
    }
    let costsWithFilters = [...costs];
    for (const key in filters) {
      costsWithFilters = filtersFunctions[key as keyof typeof filtersFunctions](costsWithFilters, filters);
    }
    console.log(1);
    return costsWithFilters;
  }
}
