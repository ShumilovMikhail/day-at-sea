import { Injectable } from '@angular/core';

import { Token } from '../types';

@Injectable({ providedIn: 'root' })
export class LocalStorageJwtService {
  private readonly jwtKey = 'jwt-token';

  public setToken(jwt: Token): void {
    localStorage.setItem(this.jwtKey, jwt);
  }

  public getToken(): Token | null {
    return localStorage.getItem(this.jwtKey) as Token;
  }

  public removeToken(): void {
    return localStorage.removeItem(this.jwtKey);
  }
}
