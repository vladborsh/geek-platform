import { RoleType } from '../enums/role-type.enum';

export interface AuthDataDto {
    token: string;
    email: string;
    firstName: string;
    lastName: string;
    role: RoleType;
    id: string;
    photoImgUrl: string;
}
