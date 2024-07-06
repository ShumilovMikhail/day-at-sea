import { FormArray, FormControl } from '@angular/forms';

export interface PhotosFormVM {
  photos: FormArray<FormControl<string>>;
  generalPhotoIndex: FormControl<number | null>;
}
