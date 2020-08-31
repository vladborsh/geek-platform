import { QuizDto, UserDto } from '@geek-platform/api-interfaces';

export interface QuizAssignmentInterface {
  createdDate: number;
  assignedTo: UserDto;
  quiz: QuizDto;
  timeLimitMs: number;
  dueDate: number;
  startTime: number;
}
