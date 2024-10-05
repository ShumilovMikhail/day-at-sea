import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsIncomeObjectsService } from '../../services/statistics-income-objects.service';
import { getMonth } from '@utils/functions';
import { map, Observable } from 'rxjs';
import { IncomeObjectEntity } from '../../types/income-object.models';

@Component({
  selector: 'account-statistics-income-objects-container',
  standalone: true,
  imports: [CommonModule],
  providers: [StatisticsIncomeObjectsService],
  templateUrl: './statistics-income-objects-container.component.html',
  styleUrl: './statistics-income-objects-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsIncomeObjectsContainerComponent {
  private readonly statisticsIncomeObjectService = inject(StatisticsIncomeObjectsService);
  public readonly incomeObjects$: Observable<IncomeObjectEntity[]> =
    this.statisticsIncomeObjectService.incomeObjectsEntity$;
  public readonly totalIncome: Observable<number> = this.incomeObjects$.pipe(
    map((incomes) => incomes.reduce((totalIncome, item) => totalIncome + item.totalIncome, 0))
  );
  public readonly year = new Date().getFullYear();
  public readonly month = getMonth();
}
