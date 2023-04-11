import { Role } from './role.interface';

export interface PayloadToken {
  exp: number;
  iat: number;
  id: string;
  member: boolean;
  role: Role;
  email: string;
}
