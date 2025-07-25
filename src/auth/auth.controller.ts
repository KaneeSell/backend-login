import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(200)
  tokenValid(): string {
    return 'Token Valido';
  }

  @Post()
  @HttpCode(200)
  async login(@Body() data: LoginDto): Promise<{
    access_token: string;
    user: { id: string; email: string };
  } | void> {
    return this.authService.login(data);
  }
}
