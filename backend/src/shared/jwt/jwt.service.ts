import { Injectable } from '@nestjs/common';
import { JwtTokenPayload } from 'src/utils/types/token.payload';
import { JwtService as Jwt } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/users/schemas/user.schema';
import { JwtTokenPurpose } from 'src/utils/enums/jwt-token-purpose';
import { Role } from 'src/utils/enums/roles';
@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: Jwt,
    private config: ConfigService,
  ) {}
  generateToken(
    payload: JwtTokenPayload,
    secret: string,
    expiresIn: string,
  ): string {
    return this.jwtService.sign(payload as object, {
      secret,
      expiresIn: expiresIn as any,
    });
  }
  getUserPayload(user: User, purpose: JwtTokenPurpose): JwtTokenPayload {
    const issuer = this.config.getOrThrow<string>('JWT_ISSUER');
    const audience = this.config.getOrThrow<string>('JWT_AUDIENCE');
    return {
      id: crypto.randomUUID(),
      userId: parseInt(user._id.toString(), 10),
      name: user.name,
      email: user.email,
      purpose: purpose,
      role: Role.LEARNER,
      issuer: issuer,
      audience: audience,
    };
  }
}
