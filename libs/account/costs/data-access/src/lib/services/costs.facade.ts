import { AgencyFacade } from '@account/data-access-agency';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, filter, map, Observable, take, tap, withLatestFrom } from 'rxjs';
import { CostsStateStatus } from '../types/costs-state.models';
import {
  selectCosts,
  selectCostsError,
  selectCostsLoaded,
  selectCostsLoading,
  selectCostsStatus,
} from '../+state/costs.selectors';
import { ResponseError } from '@http';
import { CostDTO, CostEntity, CostsEntity } from '../types/costs.models';
import { costsActions } from '../+state/costs.actions';
import { costDTOAdapter } from '../+state/cost-dto.adapter';

@Injectable({ providedIn: 'root' })
export class CostsFacade {
  private readonly store = inject(Store);
  private readonly agencyFacade = inject(AgencyFacade);

  public readonly status$: Observable<CostsStateStatus | null> = this.store.select(selectCostsStatus);
  public readonly costsLoaded$: Observable<boolean> = this.store.select(selectCostsLoaded);
  public readonly error$: Observable<ResponseError | null> = this.store.select(selectCostsError);
  public readonly loading$: Observable<boolean> = this.store.select(selectCostsLoading);
  public readonly costs$: Observable<CostsEntity> = this.store.select(selectCosts).pipe(
    combineLatestWith(this.agencyFacade.id$),
    withLatestFrom(this.costsLoaded$),
    tap(([args, isLoaded]: [[CostsEntity, number | null], boolean]) => {
      if (!isLoaded && args[1]) {
        this.store.dispatch(costsActions.getCosts({ agencyId: args[1] }));
      }
    }),
    filter(([args, isLoaded]: [[CostsEntity, number | null], boolean]) => isLoaded),
    map(([args, isLoaded]: [[CostsEntity, number | null], boolean]) => {
      return args[0];
    })
  );

  public updateCost(cost: CostEntity): void {
    this.agencyFacade.id$
      .pipe(
        filter((id: number | null): id is number => Boolean(id)),
        take(1)
      )
      .subscribe((agencyId: number) => {
        this.store.dispatch(costsActions.updateCost({ agencyId, cost: costDTOAdapter.entityToDTO(cost) as CostDTO }));
      });
  }

  public addCost(cost: Omit<CostEntity, 'id'>): void {
    this.agencyFacade.id$
      .pipe(
        filter((id: number | null): id is number => Boolean(id)),
        take(1)
      )
      .subscribe((agencyId: number) => {
        this.store.dispatch(costsActions.addCost({ agencyId, cost: costDTOAdapter.entityToDTO(cost) }));
      });
  }

  public deleteCost(id: number): void {
    this.agencyFacade.id$
      .pipe(
        filter((id: number | null): id is number => Boolean(id)),
        take(1)
      )
      .subscribe((agencyId: number) => {
        this.store.dispatch(costsActions.deleteCost({ agencyId, id }));
      });
  }
}
