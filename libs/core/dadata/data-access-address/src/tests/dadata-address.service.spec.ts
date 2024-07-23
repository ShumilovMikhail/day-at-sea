import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { DADATA_TOKEN } from '../lib/types/dadata-api.token';
import { DadataAddressService } from '../lib/services/dadata-address.service';
import { lastValueFrom, of } from 'rxjs';

describe('DadataAddressService', () => {
  let dadataAddressService: DadataAddressService;
  const fakeHttpClient = {
    post: jest.fn(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: fakeHttpClient,
        },
        {
          provide: DADATA_TOKEN,
          useValue: 'dadata-token',
        },
      ],
    });
    dadataAddressService = TestBed.inject(DadataAddressService);
  });

  it('getCities: should return array of cities', fakeAsync(() => {
    fakeHttpClient.post.mockReturnValue(of({ suggestions: [{ value: 'Москва' }] }));
    dadataAddressService.getCities('моск');
    expect(fakeHttpClient.post).toHaveBeenCalled();
    dadataAddressService.getCities('моск').subscribe((cities) => {
      expect(cities).toEqual(['Москва']);
    });
  }));
});
