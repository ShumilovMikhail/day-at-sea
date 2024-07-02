import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PhotosVM } from '../../types/photos.models';
import { AddObjectPhotosListUiComponent } from '../add-object-photos-list-ui/add-object-photos-list-ui.component';
import { AddObjectPhotosFileUploaderUiComponent } from '../add-object-photos-file-uploader-ui/add-object-photos-file-uploader-ui.component';

@Component({
  selector: 'account-add-object-photos-container',
  standalone: true,
  imports: [CommonModule, AddObjectPhotosListUiComponent, AddObjectPhotosFileUploaderUiComponent],
  templateUrl: './add-object-photos-container.component.html',
  styleUrl: './add-object-photos-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectPhotosContainerComponent {
  @Input({ required: true }) form!: FormGroup<PhotosVM>;
  private get formArrayPhotos(): FormArray<FormControl<string>> {
    return this.form.get('photos') as FormArray;
  }
  private loadedPhotosView: string[] = [];
  get photosView(): string[] {
    return [...this.loadedPhotosView];
  }

  public onLoadPhotos(loadedPhotos: File[]): void {
    for (const photo of loadedPhotos) {
      const fileReader = new FileReader();
      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        this.formArrayPhotos.push(new FormControl(event.target?.result as string) as FormControl<string>);
      };
      fileReader.readAsDataURL(photo);
      this.loadedPhotosView.push(URL.createObjectURL(photo));
    }
    if (!this.form.get('generalPhotoIndex')?.value) {
      this.form.get('generalPhotoIndex')?.patchValue(0);
    }
  }

  public onDeletePhoto(photoIndex: number): void {
    this.formArrayPhotos.removeAt(photoIndex);
    this.loadedPhotosView = [...this.loadedPhotosView].filter((item, index) => index !== photoIndex);
  }

  public onSelectPhoto(photoIndex: number): void {
    console.log(1);
    this.form.get('generalPhotoIndex')?.patchValue(photoIndex);
  }
}
