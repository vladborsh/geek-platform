import { Schema } from 'mongoose';
import { schema } from '../../helpers/schema.helper';
import { QuizDto, QuestionDto } from '@geek-platform/api-interfaces';

export const quizSchema = new Schema(
  schema<QuizDto>({
    name: String,
    questions: [new Schema(
      schema<QuestionDto>({
        actualQuestion: String,
        answers: [String],
        correctAnswer: Number,
      }),
    )],
  }),
);

export const QUIZ_SCHEMA_NAME = 'quiz';
