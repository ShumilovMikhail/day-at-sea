import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, Subject, switchMap, take, tap, withLatestFrom } from 'rxjs';

import { IncomeObjectDTO, IncomeObjectEntity } from '../types/income-object.models';
import { ApiService } from '@http';
import { AgencyFacade } from '@account/data-access-agency';
import { incomeObjectAdapter } from '../utils/income-object.adapter';
import { MyObjectsFacade, MyObjectVM } from '@account/my-objects/data-access';

@Injectable()
export class StatisticsIncomeObjectsService {
  private readonly myObjectsFacade = inject(MyObjectsFacade);
  private readonly agencyFacade = inject(AgencyFacade);
  private readonly apiService = inject(ApiService);
  private readonly incomeObjectsEntity: Subject<IncomeObjectEntity[] | null> = new BehaviorSubject<
    IncomeObjectEntity[] | null
  >(null);
  public readonly incomeObjectsEntity$: Observable<IncomeObjectEntity[]> = this.incomeObjectsEntity.asObservable().pipe(
    tap((incomes: IncomeObjectEntity[] | null) => {
      if (!incomes) this.getIncomeObjects();
    }),
    filter((incomes: IncomeObjectEntity[] | null): incomes is IncomeObjectEntity[] => Boolean(incomes))
  );

  private getIncomeObjects(): void {
    console.log(1);
    this.agencyFacade.id$
      .pipe(
        filter((id: number | null): id is number => Boolean(id)),
        switchMap((id: number) => {
          return this.apiService
            .get<IncomeObjectDTO[] | IncomeObjectDTO>(`agencies/${id}/statistics/income`)
            .pipe(
              map((incomes: IncomeObjectDTO[] | IncomeObjectDTO) => (Array.isArray(incomes) ? incomes : [incomes]))
            );
        }),
        withLatestFrom(this.myObjectsFacade.myObjectsVM$),
        map(([incomes, myObjects]: [IncomeObjectDTO[], MyObjectVM[]]) =>
          incomeObjectAdapter.dtoToEntity(incomes, myObjects)
        ),
        take(1)
      )
      .subscribe((incomes: IncomeObjectEntity[]) => this.incomeObjectsEntity.next(incomes));
  }
}
