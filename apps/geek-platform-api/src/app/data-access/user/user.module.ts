import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_SCHEMA_NAME, USER_SCHEMA } from './user.schema';
import { UserService } from './user.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: USER_SCHEMA_NAME, schema: USER_SCHEMA },
    ]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
