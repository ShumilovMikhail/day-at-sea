import { DestroyRef, Directive, ElementRef, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map } from 'rxjs';

@Directive({
  selector: '[uiFormsSearch]',
  standalone: true,
})
export class SearchDirective implements OnInit {
  @Output() searchEvent = new EventEmitter<void>();
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, 'input')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(100),
        map((event: unknown) => {
          return this.el.nativeElement.value;
        }),
        filter((data: string | null): data is string => Boolean(data && data.length >= 3)),
        distinctUntilChanged((a, b) => a === b)
      )
      .subscribe(() => {
        this.searchEvent.emit();
      });
  }
}
