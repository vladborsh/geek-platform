import { RoleType } from '@geek-platform/api-interfaces';
import { NotAcceptableException } from '@nestjs/common';
import { pick } from 'lodash';

export enum OperationType {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum RecordsFilterType {
  ALL,
  RELATION,
  NONE,
}

export enum FieldVisibilityMode {
  ALL,
  FROM_LIST,
  NONE,
}

export interface PermissionsForRole<T> {
  acceptableOperations: ReadonlyArray<OperationType>;
  recordsFilter: RecordsFilterType;
  visibleFields: (keyof T)[];
  fieldVisibilityMode: FieldVisibilityMode;
  mapData?(data: T): any;
}

export type PermissionModel<T> = Readonly<Record<RoleType, Readonly<PermissionsForRole<T>>>>;

export function validateOperationByPermission<T>(
  role: RoleType,
  model: PermissionModel<T>,
  operation: OperationType,
): boolean {
  if (!model[role].acceptableOperations.includes(operation)) {
    throw new NotAcceptableException('Operation not acceptable');
  }

  return true;
}

export function filterByPermission<T>(
  data: T[],
  role: RoleType,
  userId: string,
  model: PermissionModel<T>,
): T[] {
  if (model[role].recordsFilter === RecordsFilterType.ALL) {
    return selectVisibleFields<T>(data, model[role]);
  }

  if (model[role].recordsFilter === RecordsFilterType.RELATION) {
    if (!model[role].mapData) {
      return data;
    }

    return selectVisibleFields<T>(
      data.filter((item: T) => String(model[role].mapData(item)) === String(userId)),
      model[role],
    );
  }

  if (model[role].recordsFilter === RecordsFilterType.NONE) {
    return [];
  }
}

export function selectVisibleFields<T extends {}>(
  data: T[],
  permissions: PermissionsForRole<T>,
): T[] {
  if (permissions.fieldVisibilityMode === FieldVisibilityMode.ALL) {
    return data;
  }

  if (permissions.fieldVisibilityMode === FieldVisibilityMode.FROM_LIST) {
    return data.map((item: T) => pick(item, permissions.visibleFields));
  }

  return [];
}
