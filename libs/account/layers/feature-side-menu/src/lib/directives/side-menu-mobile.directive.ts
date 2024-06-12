import {
  Directive,
  ElementRef,
  HostBinding,
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
    this.isOpen = isOpen;
    this.onModalToggle(this.screenWidth <= 480 ? this.isOpen : true);
  }
  private isOpen = false;
  private screenWidth = window.innerWidth;
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onWindowResize(width: number) {
    this.screenWidth = width;
    this.onModalToggle(width > 480 ? true : this.isOpen);
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
