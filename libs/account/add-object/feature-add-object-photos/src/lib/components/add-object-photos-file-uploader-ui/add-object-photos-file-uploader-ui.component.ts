import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesDropDirective } from '../../directives/files-drop.directive';

@Component({
  selector: 'account-add-object-photos-file-uploader-ui',
  standalone: true,
  imports: [CommonModule, FilesDropDirective],
  templateUrl: './add-object-photos-file-uploader-ui.component.html',
  styleUrl: './add-object-photos-file-uploader-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectPhotosFileUploaderUiComponent {
  @Output() loadPhotosEvent = new EventEmitter<File[]>();

  public onPhotosDrop(event: Event): void {
    this.onLoadPhotos((event as DragEvent).dataTransfer!.files);
  }
  public onPhotosSelect(event: Event): void {
    this.onLoadPhotos((event.target as HTMLInputElement).files!);
  }

  public onLoadPhotos(files: FileList): void {
    const loadedPhotos: File[] = Array.from(files);
    this.loadPhotosEvent.emit(loadedPhotos);
  }
}
