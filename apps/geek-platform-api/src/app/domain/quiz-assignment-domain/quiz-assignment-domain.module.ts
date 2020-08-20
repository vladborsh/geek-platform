import { Module } from '@nestjs/common';
import { QuizAssignmentDomainService } from './quiz-assignment-domain.service';
import { QuizAssignmentModule } from '../../data-access/quiz-assignment/quiz-assignment.module';

@Module({
  imports: [
    QuizAssignmentModule,
  ],
  providers: [QuizAssignmentDomainService],
  exports: [QuizAssignmentDomainService],
})
export class QuizAssignmentDomainModule {}
