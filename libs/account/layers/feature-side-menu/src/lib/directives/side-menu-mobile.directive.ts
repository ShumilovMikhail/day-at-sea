import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[accountSideMenuMobile]',
  standalone: true,
})
export class SideMenuMobileDirective {
  @Input() set modalOpen(isOpen: boolean) {
    this.onModalToggle(this.screenWidth <= 480 ? isOpen : true);
  }
  private screenWidth = window.innerWidth;
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onWindowResize(width: number) {
    this.screenWidth = width;
  }

  private onModalToggle(isOpen: boolean) {
    const nativeElement = this.el.nativeElement;
    if (!isOpen) {
      this.renderer.setAttribute(nativeElement, 'mobile-hidden', '');
    } else {
      this.renderer.removeAttribute(nativeElement, 'mobile-hidden');
    }
  }
}
