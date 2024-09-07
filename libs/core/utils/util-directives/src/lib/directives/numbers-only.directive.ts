import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[utilsNumbersOnly]',
  standalone: true,
})
export class NumbersOnlyDirective {
  private readonly element = inject(ElementRef);

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const initialValue = this.element.nativeElement.value;
    this.element.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
    if (initialValue !== this.element.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
