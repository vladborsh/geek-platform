import { RoleType } from '@geek-platform/api-interfaces';

export interface JwtUserPayload {
  email: string;
  role: RoleType;
}
