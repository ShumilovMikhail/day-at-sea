import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { DADATA_TOKEN } from '../types/dadata-api.token';
import { AddressList, AddressResponse, Suggestion } from '../types/address.model';

@Injectable({ providedIn: 'root' })
export class DadataAddressService {
  private readonly http = inject(HttpClient);
  private readonly apiToken = inject(DADATA_TOKEN);
  private readonly url = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

  public getCities(query: string): Observable<AddressList> {
    return this.http
      .post<AddressResponse>(
        this.url,
        JSON.stringify({
          query,
          from_bound: { value: 'city' },
          to_bound: { value: 'city' },
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Token ' + this.apiToken,
          },
        }
      )
      .pipe(
        map((response: AddressResponse) => {
          return response.suggestions.map((suggestion: Suggestion) => suggestion.value);
        })
      );
  }
}
