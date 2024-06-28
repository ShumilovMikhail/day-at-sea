import { DestroyRef, Directive, ElementRef, HostListener, Input, OnInit, Renderer2, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[accountInfrastructureCheckbox]',
  standalone: true,
})
export class InfrastructureCheckboxDirective implements OnInit {
  private readonly element = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);
  @Input({ required: true }) checkbox!: HTMLElement;

  ngOnInit(): void {
    fromEvent(this.checkbox, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if ((event.target as HTMLInputElement).checked) {
          this.renderer.addClass(this.element.nativeElement, 'active');
        } else {
          this.renderer.removeClass(this.element.nativeElement, 'active');
        }
      });
  }
}
