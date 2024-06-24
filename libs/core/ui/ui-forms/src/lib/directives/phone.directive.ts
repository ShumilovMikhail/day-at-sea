import { DestroyRef, Directive, ElementRef, HostListener, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, map } from 'rxjs';

const getInputNumbersValue = (input: string): string | null => {
  return input ? input.replace(/\D/g, '') : null;
};

@Directive({
  selector: '[uiFormsPhone]',
  standalone: true,
})
export class PhoneDirective {
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    fromEvent(this.el.nativeElement as HTMLInputElement, 'input')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event: Event) => {
        const input = event.target as HTMLInputElement;
        const data: string = this.el.nativeElement.value as string;
        let inputNumbersValue: string | null = getInputNumbersValue(data);
        let formattedInputValue: string;

        if (!inputNumbersValue) {
          input.value = '';
          return;
        }

        if (data.length != input.selectionStart) {
          if ((event as InputEvent).data && /\D/g.test((event as InputEvent).data as string)) {
            input.value = inputNumbersValue;
          }
          return;
        }
        if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
          if (inputNumbersValue[0] == '9') inputNumbersValue = '7' + inputNumbersValue;
          const firstSymbols = inputNumbersValue[0] == '8' ? '8' : '+7';
          formattedInputValue = input.value = firstSymbols + ' ';
          if (inputNumbersValue.length > 1) {
            formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
          }
          if (inputNumbersValue.length >= 5) {
            formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
          }
          if (inputNumbersValue.length >= 8) {
            formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
          }
          if (inputNumbersValue.length >= 10) {
            formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
          }
        } else {
          formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
      });
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    const data = this.el.nativeElement.value as string;
    if (event.code === 'Backspace' && (data.length == 1 || data === '+7 ' || data === '8 ')) {
      this.el.nativeElement.value = '';
      event.preventDefault();
    }
  }
}
