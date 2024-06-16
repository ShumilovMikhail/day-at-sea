import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[uiFormsPhone]',
  standalone: true,
})
export class PhoneDirective {
  @Input({ required: true }) inputValue!: string;
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  @HostListener('input', ['$event']) onKeyDown(event: InputEvent) {
    if (event.data && /\D/g.test(event.data)) {
      this.el.nativeElement.value = this.inputValue;
    }
  }
}
