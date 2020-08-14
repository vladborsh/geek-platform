import { Module } from '@nestjs/common';
import { QuizDomainService } from './quiz-domain.service';
import { QuizModule } from '../../data-access/quiz/quiz.module';

@Module({
  imports: [
    QuizModule,
  ],
  providers: [QuizDomainService],
  exports: [QuizDomainService],
})
export class QuizDomainModule {}
