import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddObjectPhotosUiComponent } from '../add-object-photos-ui/add-object-photos-ui.component';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PhotosVM } from '../types/photos.models';

@Component({
  selector: 'account-add-object-photos-container',
  standalone: true,
  imports: [CommonModule, AddObjectPhotosUiComponent],
  templateUrl: './add-object-photos-container.component.html',
  styleUrl: './add-object-photos-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectPhotosContainerComponent {
  @Input({ required: true }) form!: FormGroup<PhotosVM>;
  private get photos(): FormArray<FormControl<string>> {
    return this.form.get('photos') as FormArray;
  }
  public loadedPhotosView: string[] = [];

  public onLoadPhotos(loadedPhotos: File[]): void {
    const fileReader = new FileReader();
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      this.photos.push(new FormControl(event.target!.result as string) as FormControl<string>);
    };
    for (const photo of loadedPhotos) {
      this.loadedPhotosView.push(URL.createObjectURL(photo));
      fileReader.readAsDataURL(photo);
    }
  }

  public onDeletePhoto(photoIndex: number): void {
    this.photos.removeAt(photoIndex);
    this.loadedPhotosView.filter((item, index) => index !== photoIndex);
  }

  public onSelectPhoto(photoIndex: number): void {
    this.form.get('generalPhotoIndex')?.patchValue(photoIndex);
  }
}
