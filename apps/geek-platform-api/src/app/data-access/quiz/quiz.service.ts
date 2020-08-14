import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { QuizDto, Update } from '@geek-platform/api-interfaces';
import { QUIZ_SCHEMA_NAME } from './quiz.schema';
import { from, Observable } from 'rxjs';
import { query } from '../../helpers/query.helper';

export type QuizData = Document & Exclude<QuizDto, '_id'>;

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(QUIZ_SCHEMA_NAME) private readonly quizModel: Model<QuizData>,
  ) {}

  public create$(quizDto: QuizDto): Observable<QuizDto> {
    return from(new this.quizModel(quizDto).save());
  }

  public find$(filter?: Partial<QuizDto>): Observable<QuizDto[]> {
    return from(this.quizModel.find());
  }

  public findById$(id: string): Observable<QuizDto> {
    return from(this.quizModel.findOne(query<QuizDto>({ _id: id })));
  }

  public update$(quizDto: Update<QuizDto>): Observable<QuizDto> {
    return from(this.quizModel.findByIdAndUpdate(quizDto._id, quizDto));
  }

  public delete$(id: string): Observable<QuizDto> {
    return from(this.quizModel.findByIdAndRemove(id));
  }
}
