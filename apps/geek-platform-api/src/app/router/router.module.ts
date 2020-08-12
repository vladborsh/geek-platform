import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google-auth/google-auth.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [
    GoogleAuthController,
  ]
})
export class RouterModule {}
