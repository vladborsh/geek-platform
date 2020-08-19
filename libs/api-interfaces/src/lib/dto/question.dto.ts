import { Identifiable } from '../base/identifiable.dto';

export interface QuestionDto extends Identifiable {
  actualQuestion: string;
  answers: string[];
  correctAnswer: number;
}
