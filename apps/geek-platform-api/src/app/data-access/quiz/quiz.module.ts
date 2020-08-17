import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QUIZ_SCHEMA_NAME, quizSchema } from './quiz.schema';
import { QuizService } from './quiz.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QUIZ_SCHEMA_NAME, schema: quizSchema },
    ]),
  ],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
