import { Identifiable } from '../base/identifiable.dto';
import { AssignmentStatus } from '../enums/assignment-status.enum';

export interface QuizAssignmentDto extends Identifiable {
    createdDate: number;
    assignedToId: string;
    quizId: string;
    timeLimitMs: number;
    dueDate: number;
    status: AssignmentStatus;
    startTime: number;
    answers: number[];
    endTime: number;
}
