import { Injectable } from '@nestjs/common';
import { JwtTokenPayload } from 'src/utils/types/token.payload';
import { JsonWebTokenError, JwtService as Jwt } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/auth/schemas/user.schema';
import { JwtTokenPurpose } from 'src/utils/enums/jwt-token-purpose';
import { Role } from 'src/utils/enums/roles';
import { UnauthorizedException } from '@nestjs/common';
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

  verifyToken(token: string, secret: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: secret,
      });
      return payload;
    } catch (error: unknown) {
      const message = `Token verification failed: ${(error as JsonWebTokenError).message}`;
      throw new UnauthorizedException(message);
    }
  }

  getUserPayload(user: User, purpose: JwtTokenPurpose): JwtTokenPayload {
    const issuer = this.config.getOrThrow<string>('JWT_ISSUER');
    const audience = this.config.getOrThrow<string>('JWT_AUDIENCE');
    return {
      id: crypto.randomUUID(),
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      purpose: purpose,
      role: user.role as Role,
      issuer: issuer,
      audience: audience,
    };
  }
}
