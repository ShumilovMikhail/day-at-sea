import { Directive, ElementRef, EventEmitter, HostListener, Output, inject } from '@angular/core';

@Directive({
  selector: '[accountFilesDrop]',
  standalone: true,
})
export class FilesDropDirective {
  @Output() filesDropEvent = new EventEmitter<Event>();
  private readonly element = inject(ElementRef);

  @HostListener('drop', ['$event']) onDrop(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.filesDropEvent.emit(event);
  }

  @HostListener('dragover', ['$event']) onDragover(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
