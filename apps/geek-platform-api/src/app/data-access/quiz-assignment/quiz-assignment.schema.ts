import { Schema } from 'mongoose';
import { schema } from '../../helpers/schema.helper';
import { QuizAssignmentDto } from '@geek-platform/api-interfaces';

export const quizAssignmentSchema = new Schema(
  schema<QuizAssignmentDto>({
    createdDate: Number,
    assignedToId: String,
    quizId: String,
    timeLimitMs: Number,
    dueDate: Number,
    startTime: Number,
    endTime: Number,
    status: String,
    answers: [Number],
  }),
);

export const QUIZ_ASSIGNMENT_SCHEMA_NAME = 'quizAssignment';
