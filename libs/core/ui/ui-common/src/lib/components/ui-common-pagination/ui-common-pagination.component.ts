import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-common-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-common-pagination.component.html',
  styleUrl: './ui-common-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCommonPaginationComponent {
  @Output() changePageEvent = new EventEmitter<number>();
  @Input({ required: true }) totalPages!: number;
  @Input({ required: true }) currentPage!: number;
  @Input() minPage = 1;
  @Input() pace = 1;
  get pages(): number[] {
    const array = new Array(3).fill(null);
    if (this.currentPage === this.minPage) return array.map((item, index) => index + 1);
    if (this.currentPage === this.totalPages) return array.map((item, index) => this.totalPages - index).reverse();
    return array.map((item, index) => (index === 0 ? this.currentPage - 1 : this.currentPage + index - 1));
  }

  public onChangePage(page: number) {
    if (page >= this.minPage && page <= this.totalPages) this.changePageEvent.emit(page);
  }
}
