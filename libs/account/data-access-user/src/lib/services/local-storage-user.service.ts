import { Injectable } from '@angular/core';

import { UserEntity } from '../types/user.models';

@Injectable({ providedIn: 'root' })
export class LocalStorageUserService {
  private readonly userKey = 'user';

  public getUser(): UserEntity | null {
    return JSON.parse(localStorage.getItem(this.userKey) as string);
  }

  public setUser(user: UserEntity): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  public removeUser(): void {
    localStorage.removeItem(this.userKey);
  }
}
