import { Identifiable } from '../base/identifiable.dto';
import { QuestionDto } from './question.dto';

export interface QuizDto extends Identifiable {
  name: string;
  questions: QuestionDto[];
}
