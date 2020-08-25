import { Injectable } from '@nestjs/common';
import {
  QuizAssignmentService,
  QuizAssignmentData,
} from '../../data-access/quiz-assignment/quiz-assignment.service';
import { QuizAssignmentDto, Update, RoleType, AuthDataDto, AssignmentStatus } from '@geek-platform/api-interfaces';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  PermissionModel,
  OperationType,
  RecordsFilterType,
  FieldVisibilityMode,
  validateOperationByPermission,
} from '../../helpers/permission.helpers';

const quizAssignmentPermissionModel: PermissionModel<QuizAssignmentDto> = {
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
export class QuizAssignmentDomainService {
  constructor(private quizAssignmentService: QuizAssignmentService) {}

  public create$(
    payload: QuizAssignmentDto,
    { role: userRole, id: userId }: AuthDataDto,
    correlationId: string,
  ): Observable<QuizAssignmentDto> {
    validateOperationByPermission(userRole, quizAssignmentPermissionModel, OperationType.CREATE);

    return this.quizAssignmentService
      .create$({ ...payload, status: AssignmentStatus.ASSIGNED, createdDate: Date.now() })
      .pipe(map((result: QuizAssignmentData) => result.toObject()));
  }

  public start$(id: string, { role: userRole, id: userId }: AuthDataDto): Observable<QuizAssignmentDto> {
    return this.quizAssignmentService.findById$(id)
      .pipe(
        switchMap((assignment: QuizAssignmentData) => this.quizAssignmentService.update$({
          ...assignment.toObject(),
          status: AssignmentStatus.IN_PROGRESS,
          startTime: Date.now(),
        })),
      );
  }

  public stop$(id: string, { role: userRole, id: userId }: AuthDataDto): Observable<QuizAssignmentDto> {
    return this.quizAssignmentService.findById$(id)
      .pipe(
        switchMap((assignment: QuizAssignmentData) => this.quizAssignmentService.update$({
          ...assignment.toObject(),
          status: AssignmentStatus.DONE,
          endTime: Date.now(),
        })),
      );
  }

  public find$(
    { role: userRole, id: userId }: AuthDataDto,
    filter?: Partial<QuizAssignmentDto>,
  ): Observable<QuizAssignmentDto[]> {
    validateOperationByPermission(userRole, quizAssignmentPermissionModel, OperationType.READ);

    return this.quizAssignmentService.find$(filter);
  }

  public findById$(
    id: string,
    { role: userRole, id: userId }: AuthDataDto,
  ): Observable<QuizAssignmentDto> {
    validateOperationByPermission(userRole, quizAssignmentPermissionModel, OperationType.READ);

    return this.quizAssignmentService.findById$(id);
  }

  public update$(
    { _id, ...quizAssignmentDto }: Update<QuizAssignmentDto>,
    { role: userRole, id: userId }: AuthDataDto,
    correlationId: string,
  ): Observable<QuizAssignmentDto> {
    validateOperationByPermission(userRole, quizAssignmentPermissionModel, OperationType.UPDATE);

    return this.quizAssignmentService.update$({ _id, ...quizAssignmentDto }).pipe(
      map((result: QuizAssignmentData) => result.toObject()),
      map((result: QuizAssignmentDto) => ({ _id, ...result, ...quizAssignmentDto })),
    );
  }

  public delete$(
    id: string,
    { role: userRole, id: userId }: AuthDataDto,
    correlationId: string,
  ): Observable<QuizAssignmentDto> {
    validateOperationByPermission(userRole, quizAssignmentPermissionModel, OperationType.DELETE);

    return this.quizAssignmentService
      .delete$(id)
      .pipe(map((result: QuizAssignmentData) => result.toObject()));
  }
}
