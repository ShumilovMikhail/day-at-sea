import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
  selector: '[uiFormsSelect]',
  standalone: true,
})
export class SelectDirective {
  @Input({ required: true }) set isSelecting(isSelecting: boolean) {
    if (isSelecting) {
      this.onSelecting();
    } else {
      this.onBlur();
    }
  }
  @Input({ required: true }) set options(options: string[] | null) {
    this.hasOptions = Boolean(options);
  }
  private readonly element = inject(ElementRef);
  private hasOptions = false;

  private onSelecting(): void {
    if (this.hasOptions) {
      (this.element.nativeElement.parentNode as HTMLElement).style.zIndex = '6';
    }
  }

  private onBlur(): void {
    (this.element.nativeElement.parentNode as HTMLElement).style.zIndex = '3';
  }

  @HostListener('document:click', ['$event.target']) onClick(target: HTMLElement): void {
    const isClickedInside: boolean = this.element.nativeElement.contains(target);
    if (!isClickedInside) {
      this.onBlur();
    }
  }
}
