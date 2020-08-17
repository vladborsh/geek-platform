interface Question {
  _id: string;
  answers: Array<string>;
  actualQuestion: string;
  correctAnswer: number;
}

export interface Quiz {
  _id: string;
  name: string;
  questions: Array<Question>;
  __v: string;
}
