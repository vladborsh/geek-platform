import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../data-access/user/user.module';
import { GoogleStrategyService } from './google-strategy/google-strategy.service';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategyService,
  ],
  exports: [
    PassportModule,
    AuthService,
    GoogleStrategyService,
  ],
})
export class AuthModule {}
