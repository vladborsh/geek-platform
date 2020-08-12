import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { GoogleProfileDto } from '../models/google-profile.dto';
import { AuthDataDto } from '@geek-platform/api-interfaces';

@Injectable()
export class GoogleStrategyService extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _request: any,
    _accessToken: string,
    _refreshToken: string,
    profile: GoogleProfileDto,
    done: Function,
  ): Promise<void> {
    try {
      const authData: AuthDataDto = await this.authService.validateOAuthLogin(profile);

      done(null, authData);
    } catch (err) {
      done(err, false);
    }
  }
}
