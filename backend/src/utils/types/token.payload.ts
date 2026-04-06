import { JwtTokenPurpose } from '../enums/jwt-token-purpose';
import { Role } from '../enums/roles';
export type JwtTokenPayload = {
  id: string;
  userId: number;
  name: string;
  email: string;
  role: Role;
  purpose: JwtTokenPurpose;
  issuer: string;
  audience: string;
};
