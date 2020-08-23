import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google-auth/google-auth.controller';
import { AuthModule } from '../auth/auth.module';
import { QuizController } from './quiz/quiz.controller';
import { QuizDomainModule } from '../domain/quiz-domain/quiz-domain.module';
import { QuizAssignmentController } from './quiz-assignment/quiz-assignment.controller';
import { QuizAssignmentDomainModule } from '../domain/quiz-assignment-domain/quiz-assignment-domain.module';
import { UserController } from './user/user.controller';
import { UserModule } from '../data-access/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    QuizDomainModule,
    QuizAssignmentDomainModule,
  ],
  controllers: [
    GoogleAuthController,
    QuizController,
    QuizAssignmentController,
    UserController,
  ],
})
export class RouterModule {}
