import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PhotosFormVM } from '../../types/photos-form.models';
import { AddObjectPhotosListUiComponent } from '../add-object-photos-list-ui/add-object-photos-list-ui.component';
import { AddObjectPhotosFileUploaderUiComponent } from '../add-object-photos-file-uploader-ui/add-object-photos-file-uploader-ui.component';
import { AddObjectButtonsUiComponent } from '@account/add-object/ui';
import { Router } from '@angular/router';
import { ObjectFormStore } from '@account/add-object/data-access';
import { ObjectPhotosVM } from '../../types/photos.models';

@Component({
  selector: 'account-add-object-photos-container',
  standalone: true,
  imports: [
    CommonModule,
    AddObjectPhotosListUiComponent,
    AddObjectPhotosFileUploaderUiComponent,
    AddObjectButtonsUiComponent,
  ],
  templateUrl: './add-object-photos-container.component.html',
  styleUrl: './add-object-photos-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectPhotosContainerComponent implements OnInit {
  @Input({ required: true }) form!: FormGroup<PhotosFormVM>;
  private readonly router = inject(Router);
  private readonly objectFormStore = inject(ObjectFormStore);
  private get formArrayPhotos(): FormArray<FormControl<string>> {
    return this.form.get('photos') as FormArray;
  }
  private loadedPhotosView: string[] = [];
  get photosView(): string[] {
    return [...this.loadedPhotosView];
  }
  public error: string | null = null;

  ngOnInit(): void {
    this.loadedPhotosView = Array.from(this.formArrayPhotos.controls).map((item) => item.value);
  }

  public onLoadPhotos(loadedPhotos: File[]): void {
    this.error = null;
    for (const photo of loadedPhotos) {
      if (photo.type.includes('image')) {
        const fileReader = new FileReader();
        fileReader.onload = (event: ProgressEvent<FileReader>) => {
          this.formArrayPhotos.push(new FormControl(event.target?.result as string) as FormControl<string>);
        };
        fileReader.readAsDataURL(photo);
        this.loadedPhotosView.push(URL.createObjectURL(photo));
      } else {
        this.error = 'Поддерживаются только файлы с раширением: .png,.jpeg,.jpg,.webp';
      }
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
    this.form.get('generalPhotoIndex')?.patchValue(photoIndex);
  }

  public onNext(): void {
    this.router.navigateByUrl('account/add-object/rules');
  }

  public onSave(): void {
    this.objectFormStore.saveForm({ photos: this.form.value as ObjectPhotosVM });
  }
}
