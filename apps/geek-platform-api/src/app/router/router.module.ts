import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google-auth/google-auth.controller';
import { AuthModule } from '../auth/auth.module';
import { QuizController } from './quiz/quiz.controller';
import { QuizDomainModule } from '../domain/quiz-domain/quiz-domain.module';

@Module({
  imports: [
    AuthModule,
    QuizDomainModule,
  ],
  controllers: [
    GoogleAuthController,
    QuizController,
  ]
})
export class RouterModule {}
