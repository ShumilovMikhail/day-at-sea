import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter, Observable } from 'rxjs';

import { PhotosFormVM } from '../../types/photos-form.models';
import { AddObjectPhotosListUiComponent } from '../add-object-photos-list-ui/add-object-photos-list-ui.component';
import { AddObjectPhotosFileUploaderUiComponent } from '../add-object-photos-file-uploader-ui/add-object-photos-file-uploader-ui.component';
import { AddObjectButtonsUiComponent } from '@account/add-object/ui';
import { ObjectFormStore } from '@account/add-object/data-access';
import { ObjectPhotosVM } from '../../types/photos.models';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';

@Component({
  selector: 'account-add-object-photos-container',
  standalone: true,
  imports: [
    CommonModule,
    AddObjectPhotosListUiComponent,
    AddObjectPhotosFileUploaderUiComponent,
    AddObjectButtonsUiComponent,
    UiIndicatorsLoaderComponent,
  ],
  templateUrl: './add-object-photos-container.component.html',
  styleUrl: './add-object-photos-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectPhotosContainerComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly objectFormStore = inject(ObjectFormStore);
  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private loadedPhotosView: string[] = [];
  public readonly isSaving$: Observable<boolean> = this.objectFormStore.isSaving$;
  public form!: FormGroup<PhotosFormVM>;
  public error: string | null = null;

  private get formArrayPhotos(): FormArray<FormControl<string>> {
    return this.form.get('photos') as FormArray;
  }
  get photosView(): string[] {
    return [...this.loadedPhotosView];
  }

  ngOnInit(): void {
    this.objectFormStore.photosForm$
      .pipe(
        filter((form: FormGroup<PhotosFormVM> | null): form is FormGroup<PhotosFormVM> => Boolean(form)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((form: FormGroup<PhotosFormVM>) => {
        this.form = form;
        this.loadedPhotosView = Array.from(this.formArrayPhotos.controls).map((item) => item.value);
        this.changeDetectorRef.detectChanges();
      });
  }

  constructor(title: Title) {
    title.setTitle('Добавить объект');
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
    if (!this.form.get('primaryPhotoIndex')?.value) {
      this.form.get('primaryPhotoIndex')?.patchValue(0);
    }
  }

  public onDeletePhoto(photoIndex: number): void {
    this.formArrayPhotos.removeAt(photoIndex);
    this.loadedPhotosView = [...this.loadedPhotosView].filter((item, index) => index !== photoIndex);
  }

  public onSelectPhoto(photoIndex: number): void {
    this.form.get('primaryPhotoIndex')?.patchValue(photoIndex);
  }

  public onNext(): void {
    this.router.navigateByUrl('account/add-object/rules');
  }

  public onSave(): void {
    this.objectFormStore.saveForm({ photos: this.form.value as ObjectPhotosVM });
  }
}
