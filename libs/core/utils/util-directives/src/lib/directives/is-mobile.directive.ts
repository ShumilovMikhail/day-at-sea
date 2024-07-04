import { Directive, EventEmitter, HostListener, OnInit, Output, inject } from '@angular/core';
import { WINDOW } from '@utils/types';

@Directive({
  selector: '[utilsIsMobile]',
  standalone: true,
})
export class IsMobileDirective implements OnInit {
  @Output() isMobileEvent = new EventEmitter<boolean>();
  private readonly window = inject(WINDOW);

  ngOnInit(): void {
    this.isMobileEvent.emit(this.window.innerWidth <= 480);
  }

  @HostListener('window:resize', ['$event.target.innerWidth']) onResize(width: number): void {
    this.isMobileEvent.emit(width <= 480);
  }
}
