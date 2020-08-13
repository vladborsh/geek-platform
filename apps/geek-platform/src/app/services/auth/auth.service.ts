import { Injectable } from '@angular/core';
import { LocalStorage } from '../../decorators/local-storage.decorator';
import { AuthDataDto } from '@geek-platform/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @LocalStorage() public user: AuthDataDto;
  @LocalStorage() public token: string;
  @LocalStorage() public lastSignInTimestamp: number;
}
