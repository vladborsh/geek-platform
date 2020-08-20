import { Identifiable } from '../base/identifiable.dto';

export interface QuizAssignmentDto extends Identifiable {
    createdDate: number;
    assignedToId: string;
    quizId: string;
    timeLimitMs: number;
    dueDate: number;
}
