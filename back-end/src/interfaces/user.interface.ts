import { UserRole } from "./userRole.enum";

export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  profile?: string;
  role: UserRole;
  streams: number[];
  reviews: number[];
}
