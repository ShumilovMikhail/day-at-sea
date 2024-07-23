import { TestBed } from '@angular/core/testing';
import { FormControl, ValidationErrors } from '@angular/forms';
import { lastValueFrom, Observable, of } from 'rxjs';

import { ApiService } from '@http';
import { emailAvailableValidator } from '../lib/validators/email-available';

describe('emailAvailableValidator', () => {
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

  it('emailAvailableValidatorFn: if the email already exists, the validator should return an error', async () => {
    fakeApiService.post.mockReturnValue(
      of({
        is_exist: true,
      })
    );
    const emailAvailableValidatorResponse = TestBed.runInInjectionContext(() => {
      return emailAvailableValidator()(new FormControl('')) as Observable<ValidationErrors | null>;
    });
    await expect(lastValueFrom(emailAvailableValidatorResponse)).resolves.toEqual({ isExist: true });
  });

  it('emailAvailableValidatorFn: if the email not exists, the validator should return null', async () => {
    fakeApiService.post.mockReturnValue(
      of({
        is_exist: false,
      })
    );
    const emailAvailableValidatorResponse = TestBed.runInInjectionContext(() => {
      return emailAvailableValidator()(new FormControl('')) as Observable<ValidationErrors | null>;
    });
    await expect(lastValueFrom(emailAvailableValidatorResponse)).resolves.toBeNull();
  });
});
