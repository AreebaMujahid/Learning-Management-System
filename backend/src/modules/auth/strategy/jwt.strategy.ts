import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtTokenPayload } from 'src/utils/types/token.payload';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }
  async validate(payload: JwtTokenPayload) {
    return {
      id: payload.id,
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      purpose: payload.purpose,
      issuer: payload.issuer,
      audience: payload.audience,
    };
  }
}
