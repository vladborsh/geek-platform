import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google-auth/google-auth.controller';
import { AuthModule } from '../auth/auth.module';
import { QuizController } from './quiz/quiz.controller';
import { QuizDomainModule } from '../domain/quiz-domain/quiz-domain.module';
import { QuizAssignmentController } from './quiz-assignment/quiz-assignment.controller';
import { QuizAssignmentDomainModule } from '../domain/quiz-assignment-domain/quiz-assignment-domain.module';

@Module({
  imports: [
    AuthModule,
    QuizDomainModule,
    QuizAssignmentDomainModule,
  ],
  controllers: [
    GoogleAuthController,
    QuizController,
    QuizAssignmentController,
  ],
})
export class RouterModule {}
