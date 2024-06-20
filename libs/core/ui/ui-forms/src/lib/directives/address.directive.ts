import { DestroyRef, Directive, ElementRef, EventEmitter, OnInit, Output, Renderer2, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap } from 'rxjs';

import { DadataAddressService } from '@dadata/data-access-address';

@Directive({
  selector: '[uiFormsAddress]',
  standalone: true,
})
export class AddressDirective implements OnInit {
  @Output() findCitiesEvent = new EventEmitter<string[]>();
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly addressService = inject(DadataAddressService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, 'input')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(300),
        map((event: unknown) => {
          return this.el.nativeElement.value;
        }),
        filter((data: string | null): data is string => Boolean(data && data.length >= 3)),
        distinctUntilChanged((a, b) => a === b),
        switchMap((data: string) => this.addressService.getCities(data))
      )
      .subscribe((cities: string[]) => {
        this.findCitiesEvent.emit(cities);
      });
  }
}
