import { TestBed } from '@angular/core/testing';
import { FormControl, ValidationErrors } from '@angular/forms';
import { lastValueFrom, Observable, of } from 'rxjs';

import { ApiService } from '@http';
import { usernameAvailableValidator } from '../lib/validators/username-available';

describe('usernameAvailableValidator', () => {
  const fakeApiService = {
    post: jest.fn(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiService,
          useValue: fakeApiService,
        },
      ],
    });
  });

  it('usernameAvailableValidatorFn: if the username already exists, the validator should return an error', async () => {
    fakeApiService.post.mockReturnValue(
      of({
        is_exist: true,
      })
    );
    const usernameAvailableValidatorResponse = TestBed.runInInjectionContext(() => {
      return usernameAvailableValidator()(new FormControl('')) as Observable<ValidationErrors | null>;
    });
    await expect(lastValueFrom(usernameAvailableValidatorResponse)).resolves.toEqual({ isExist: true });
  });

  it('usernameAvailableValidatorFn: if the username not exists, the validator should return null', async () => {
    fakeApiService.post.mockReturnValue(
      of({
        is_exist: false,
      })
    );
    const usernameAvailableValidatorResponse = TestBed.runInInjectionContext(() => {
      return usernameAvailableValidator()(new FormControl('')) as Observable<ValidationErrors | null>;
    });
    await expect(lastValueFrom(usernameAvailableValidatorResponse)).resolves.toBeNull();
  });
});
