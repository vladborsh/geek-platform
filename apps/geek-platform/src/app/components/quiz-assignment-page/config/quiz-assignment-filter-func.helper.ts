import { QuizAssignmentInterface } from './quiz-assignment.interface';

export function quizAssignmentFilterFunc({ quiz, assignedTo }: QuizAssignmentInterface): string {
    return `${quiz.name}${assignedTo.firstName}${assignedTo.lastName}`;
}
