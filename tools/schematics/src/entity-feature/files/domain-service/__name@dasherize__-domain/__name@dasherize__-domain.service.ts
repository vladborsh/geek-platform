import { Injectable } from '@nestjs/common';
import { <%= classify(name) %>Service, <%= classify(name) %>Data } from '../../data-access/<%= dasherize(name) %>/<%= dasherize(name) %>.service';
import { <%= classify(name) %>Dto, Update, RoleType, AuthDataDto } from '@geek-platform/api-interfaces';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PermissionModel, OperationType, RecordsFilterType, FieldVisibilityMode, validateOperationByPermission } from '../../helpers/permission.helpers';

const <%= camelize(name) %>PermissionModel: PermissionModel<<%= classify(name) %>Dto> = {
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
export class <%= classify(name) %>DomainService {
  constructor(
    private <%= camelize(name) %>Service: <%= classify(name) %>Service,
  ) {}

  public create$(payload: <%= classify(name) %>Dto, { role: userRole, id: userId }: AuthDataDto, correlationId: string): Observable<<%= classify(name) %>Dto> {
    validateOperationByPermission(userRole, <%= camelize(name) %>PermissionModel, OperationType.CREATE);

    return this.<%= camelize(name) %>Service.create$(payload)
    .pipe(
      map((result: <%= classify(name) %>Data) => result.toObject()),
    );
  }

  public find$({ role: userRole, id: userId }: AuthDataDto, filter?: Partial<<%= classify(name) %>Dto>): Observable<<%= classify(name) %>Dto[]> {
    validateOperationByPermission(userRole, <%= camelize(name) %>PermissionModel, OperationType.READ);

    return this.<%= camelize(name) %>Service.find$(filter);
  }

  public findById$(id: string, { role: userRole, id: userId }: AuthDataDto): Observable<<%= classify(name) %>Dto> {
    validateOperationByPermission(userRole, <%= camelize(name) %>PermissionModel, OperationType.READ);

    return this.<%= camelize(name) %>Service.findById$(id);
  }

  public update$({ _id, ...<%= camelize(name) %>Dto}: Update<<%= classify(name) %>Dto>, { role: userRole, id: userId }: AuthDataDto, correlationId: string): Observable<<%= classify(name) %>Dto> {
    validateOperationByPermission(userRole, <%= camelize(name) %>PermissionModel, OperationType.UPDATE);

    return this.<%= camelize(name) %>Service.update$({ _id, ...<%= camelize(name) %>Dto })
      .pipe(
        map((result: <%= classify(name) %>Data) => result.toObject()),
        map((result: <%= classify(name) %>Dto) => ({ _id, ...result, ...<%= camelize(name) %>Dto  })),
      );
  }

  public delete$(id: string, { role: userRole, id: userId }: AuthDataDto, correlationId: string): Observable<<%= classify(name) %>Dto> {
    validateOperationByPermission(userRole, <%= camelize(name) %>PermissionModel, OperationType.DELETE);

    return this.<%= camelize(name) %>Service.delete$(id)
      .pipe(
        map((result: <%= classify(name) %>Data) => result.toObject()),
      );
  }
}
