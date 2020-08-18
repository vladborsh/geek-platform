import { Injectable } from '@nestjs/common';
import { QuizService, QuizData } from '../../data-access/quiz/quiz.service';
import { QuizDto, Update, RoleType, AuthDataDto } from '@geek-platform/api-interfaces';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PermissionModel, OperationType, RecordsFilterType, FieldVisibilityMode, validateOperationByPermission } from '../../helpers/permission.helpers';

const quizPermissionModel: PermissionModel<QuizDto> = {
  [RoleType.ADMIN]: {
    acceptableOperations: [
      OperationType.CREATE,
      OperationType.READ,
      OperationType.UPDATE,
      OperationType.DELETE,
    ],
    recordsFilter: RecordsFilterType.ALL,
    fieldVisibilityMode: FieldVisibilityMode.ALL,
    visibleFields: [],
  },
  [RoleType.TEACHER]: {
    acceptableOperations: [
      OperationType.CREATE,
      OperationType.READ,
      OperationType.UPDATE,
      OperationType.DELETE,
    ],
    recordsFilter: RecordsFilterType.ALL,
    fieldVisibilityMode: FieldVisibilityMode.ALL,
    visibleFields: [],
  },
  [RoleType.INTERN]: {
    acceptableOperations: [
      OperationType.CREATE,
      OperationType.READ,
      OperationType.UPDATE,
      OperationType.DELETE,
    ],
    recordsFilter: RecordsFilterType.ALL,
    fieldVisibilityMode: FieldVisibilityMode.ALL,
    visibleFields: [],
  },
};

@Injectable()
export class QuizDomainService {
  constructor(
    private quizService: QuizService,
  ) {}

  public create$(payload: QuizDto, { role: userRole, id: userId }: AuthDataDto, correlationId: string): Observable<QuizDto> {
    validateOperationByPermission(userRole, quizPermissionModel, OperationType.CREATE);

    return this.quizService.create$(payload)
    .pipe(
      map((result: QuizData) => result.toObject()),
    );
  }

  public find$({ role: userRole, id: userId }: AuthDataDto, filter?: Partial<QuizDto>): Observable<QuizDto[]> {
    validateOperationByPermission(userRole, quizPermissionModel, OperationType.READ);

    return this.quizService.find$(filter);
  }

  public findById$(id: string, { role: userRole, id: userId }: AuthDataDto): Observable<QuizDto> {
    validateOperationByPermission(userRole, quizPermissionModel, OperationType.READ);

    return this.quizService.findById$(id);
  }

  public update$({ _id, ...quizDto}: Update<QuizDto>, { role: userRole, id: userId }: AuthDataDto, correlationId: string): Observable<QuizDto> {
    validateOperationByPermission(userRole, quizPermissionModel, OperationType.UPDATE);

    return this.quizService.update$({ _id, ...quizDto })
      .pipe(
        map((result: QuizData) => result.toObject()),
        map((result: QuizDto) => ({ _id, ...result, ...quizDto  })),
      );
  }

  public delete$(id: string, { role: userRole, id: userId }: AuthDataDto, correlationId: string): Observable<QuizDto> {
    validateOperationByPermission(userRole, quizPermissionModel, OperationType.DELETE);

    return this.quizService.delete$(id)
      .pipe(
        map((result: QuizData) => result.toObject()),
      );
  }
}
