import { QuestionDto } from '@geek-platform/api-interfaces';

export interface State {
  isVisibleAddButton: boolean;
  isVisibleDeleteButton: boolean;
  quiz: {
    _id?: string;
    name: string;
    questions: Partial<QuestionDto>[];
  };
}
