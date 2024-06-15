import {
  DestroyRef,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[utilsAccordion]',
  standalone: true,
})
export class AccordionDirective implements OnInit {
  @Input({ required: true }) buttonToggle!: HTMLElement;
  @Input() modalOpen = false;
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    fromEvent(this.buttonToggle, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.onMenuToggle(!this.modalOpen);
        this.modalOpen = !this.modalOpen;
      });
  }

  private onMenuToggle(isOpen: boolean) {
    if (isOpen) {
      this.renderer.addClass(this.el.nativeElement, 'accordion-open');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'accordion-open');
    }
  }
}
