import { AuthDataDto, UserDto } from '@geek-platform/api-interfaces';

export function userToAuthData(user: UserDto, token?: string): AuthDataDto {
  return {
    token,
    email: user && user.email,
    firstName: user && user.firstName,
    lastName: user && user.lastName,
    role: user && user.role,
    id: user && user._id,
    photoImgUrl: user.photoImgUrl,
  };
}
