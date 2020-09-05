import { QuizDto, UserDto, Identifiable } from '@geek-platform/api-interfaces';

export interface QuizAssignmentInterface extends Identifiable {
  createdDate: number;
  assignedTo: UserDto;
  quiz: QuizDto;
  timeLimitMs: number;
  dueDate: number;
  startTime: number;
}
