import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsMobileDirective } from '@utils/directives';

@Component({
  selector: 'account-add-object-photos-list-ui',
  standalone: true,
  imports: [CommonModule, IsMobileDirective],
  templateUrl: './add-object-photos-list-ui.component.html',
  styleUrl: './add-object-photos-list-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddObjectPhotosListUiComponent {
  @Input({ required: true }) photosList!: string[];
  @Input({ required: true }) selectedPhotoIndex!: number | null;
  @Output() crossClickEvent = new EventEmitter<number>();
  @Output() selectButtonClickEvent = new EventEmitter<number>();
  public isMobile = false;

  public onCrossClick(index: number): void {
    this.crossClickEvent.emit(index);
  }

  public onSelectButtonClick(index: number): void {
    this.selectButtonClickEvent.emit(index);
  }

  public onIsMobileChange(isMobile: boolean): void {
    this.isMobile = isMobile;
  }
}
