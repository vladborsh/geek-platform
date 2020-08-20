import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QUIZ_ASSIGNMENT_SCHEMA_NAME, quizAssignmentSchema } from './quiz-assignment.schema';
import { QuizAssignmentService } from './quiz-assignment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QUIZ_ASSIGNMENT_SCHEMA_NAME, schema: quizAssignmentSchema },
    ]),
  ],
  providers: [QuizAssignmentService],
  exports: [QuizAssignmentService],
})
export class QuizAssignmentModule {}
