import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesDropDirective } from '../../directives/files-drop.directive';
import { IsMobileDirective } from '@utils/directives';

@Component({
  selector: 'account-add-object-photos-file-uploader-ui',
  standalone: true,
  imports: [CommonModule, FilesDropDirective, IsMobileDirective],
  templateUrl: './add-object-photos-file-uploader-ui.component.html',
  styleUrl: './add-object-photos-file-uploader-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectPhotosFileUploaderUiComponent {
  @Input() error: string | null = null;
  @Output() loadPhotosEvent = new EventEmitter<File[]>();
  public isDragover = false;
  public isMobile = false;

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

  public onPhotosDrag(isDragover: boolean): void {
    this.isDragover = isDragover;
  }

  public onIsMobileChange(isMobile: boolean): void {
    this.isMobile = isMobile;
  }
}
