import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RouterModule } from './router/router.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'geek-platform'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    RouterModule,
  ],
})
export class AppModule {}
