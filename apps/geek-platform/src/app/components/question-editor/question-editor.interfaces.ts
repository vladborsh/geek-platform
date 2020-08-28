import { QuestionDto } from '@geek-platform/api-interfaces';

export interface State {
  question: QuestionDto;
  isVisibleAddButton: boolean;
  isVisibleDeleteButton: boolean;
}
