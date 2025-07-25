import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'chave secreta',
    });
  }
  async validate(payload: { sub: string; email: string }): Promise<{
    userID: string;
    email: string;
  }> {
    return { userID: payload.sub, email: payload.email };
  }
}
