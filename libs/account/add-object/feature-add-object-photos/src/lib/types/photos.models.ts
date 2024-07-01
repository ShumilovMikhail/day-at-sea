import { FormArray, FormControl } from '@angular/forms';

export interface PhotosVM {
  photos: FormArray<FormControl<string>>;
  generalPhotoIndex: FormControl<number | null>;
}
