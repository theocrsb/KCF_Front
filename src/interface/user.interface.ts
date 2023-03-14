import { Role } from './role.interface';

export interface User {
  id: string;
  email: string;
  member: boolean;
  role: Role;
}
