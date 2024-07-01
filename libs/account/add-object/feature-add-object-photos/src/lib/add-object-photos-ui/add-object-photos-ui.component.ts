import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-add-object-photos-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-object-photos-ui.component.html',
  styleUrl: './add-object-photos-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectPhotosUiComponent {
  @Input({ required: true }) photosList!: string[];
  @Output() loadPhotosEvent = new EventEmitter<File[]>();
  @Output() deletePhotosEvent = new EventEmitter<number>();
  @Output() selectPhotoEvent = new EventEmitter<number>();

  public onSelectPhoto(index: number): void {
    this.selectPhotoEvent.emit(index);
  }

  public onLoadPhotos(event: Event): void {
    const loadedPhotos: File[] = Array.from((event.target as HTMLInputElement).files!);
    this.loadPhotosEvent.emit(loadedPhotos);
  }

  public deletePhoto(photoIndex: number): void {
    this.deletePhotosEvent.emit(photoIndex);
  }
}
