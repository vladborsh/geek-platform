import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { QuizAssignmentDto, Update } from '@geek-platform/api-interfaces';
import { QUIZ_ASSIGNMENT_SCHEMA_NAME } from './quiz-assignment.schema';
import { from, Observable } from 'rxjs';
import { query } from '../../helpers/query.helper';

export type QuizAssignmentData = Document & Exclude<QuizAssignmentDto, '_id'>;

@Injectable()
export class QuizAssignmentService {
  constructor(
    @InjectModel(QUIZ_ASSIGNMENT_SCHEMA_NAME) private readonly quizAssignmentModel: Model<QuizAssignmentData>,
  ) {}

  public create$(quizAssignmentDto: QuizAssignmentDto): Observable<QuizAssignmentDto> {
    return from(new this.quizAssignmentModel(quizAssignmentDto).save());
  }

  public find$(filter?: Partial<QuizAssignmentDto>): Observable<QuizAssignmentDto[]> {
    return from(this.quizAssignmentModel.find());
  }

  public findById$(id: string): Observable<QuizAssignmentDto> {
    return from(this.quizAssignmentModel.findOne(query<QuizAssignmentDto>({ _id: id })));
  }

  public update$(quizAssignmentDto: Update<QuizAssignmentDto>): Observable<QuizAssignmentDto> {
    return from(this.quizAssignmentModel.findByIdAndUpdate(quizAssignmentDto._id, quizAssignmentDto));
  }

  public delete$(id: string): Observable<QuizAssignmentDto> {
    return from(this.quizAssignmentModel.findByIdAndRemove(id));
  }
}
