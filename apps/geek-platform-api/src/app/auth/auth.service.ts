import { Injectable, ForbiddenException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../data-access/user/user.service';
import { JwtUserPayload } from './jwt-user-payload.interface';
import { UserDto, AuthDataDto, RoleType } from '@geek-platform/api-interfaces';
import { verify } from 'jsonwebtoken';
import { userToAuthData } from './user-to-auth-data.helper';
import { GoogleProfileDto } from './models/google-profile.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async verifyCookie(cookiesString: string): Promise<UserDto> {
    const cookies: string[] = cookiesString.split('; ');
    const authToken = cookies.find(cookie => cookie.startsWith('sessionId')).split('=')[1];

    const jwtPayload: JwtUserPayload = verify(authToken, process.env.JWT_SECRET) as JwtUserPayload;
    const user = await this.validateUser(jwtPayload);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async signIn(email: string, password: string): Promise<AuthDataDto> {
    if (!email || !password) {
      throw new ForbiddenException('Invalid password or email');
    }

    const user: UserDto = await this.userService.findOneByEmail(email.trim().toLowerCase());

    if (!user || user.password !== password) {
      throw new ForbiddenException('user not found or invalid password or email');
    }

    return userToAuthData(user, this.jwtService.sign({ email: user.email, role: user.role }));
  }

  async validateOAuthLogin(profile: GoogleProfileDto): Promise<AuthDataDto> {
    try {
      const email = profile.emails && profile.emails[0] && profile.emails[0].value;

      let user: UserDto;
      user = await this.userService.findOneByEmail(email.trim().toLowerCase());

      if (!user) {
        user = await this.userService.create$({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails && profile.emails[0] && profile.emails[0].value,
          password: '',
          role: RoleType.INTERN,
          teacherId: '',
          createdDate: Date.now(),
          photoImgUrl: profile.photos && profile.photos[0] && profile.photos[0].value,
        }, '').toPromise();
      }

      return userToAuthData(user, this.jwtService.sign({ email: user.email, role: user.role }));
    } catch (err) {
      throw new InternalServerErrorException('OAuthLogin', err.message);
    }
  }

  async validateUser(payload: JwtUserPayload): Promise<UserDto> {
    return await this.userService.findOneByEmail(payload.email);
  }
}
