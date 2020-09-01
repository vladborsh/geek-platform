import { Create, QuizAssignmentDto } from '@geek-platform/api-interfaces';

export function createQuizAssignmentDefaults(): Create<QuizAssignmentDto> {
  return {
    quizId: '',
    assignedToId: '',
    timeLimitMs: 120000,
    dueDate: null,
    startTime: null,
    endTime: null,
    status: null,
    answers: null,
  };
}
