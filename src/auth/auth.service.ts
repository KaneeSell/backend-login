import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(data: LoginDto): Promise<{
    access_token: string;
    user: { id: string; email: string };
  } | void> {
    console.log('Login...');
    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (userExists) {
      const passwordValid = await bcrypt.compare(
        data.password,
        userExists.password,
      );
      if (passwordValid) {
        const payload = { email: userExists.email, sub: userExists.id };
        return {
          access_token: this.jwtService.sign(payload),
          user: { id: payload.sub.toString(), email: payload.email },
        };
      } else {
        throw new UnauthorizedException('Senha inválida.');
      }
    } else {
      throw new UnauthorizedException('Email inválido.');
    }
  }
}
