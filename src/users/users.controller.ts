import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from 'generated/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(200)
  async findAll(): Promise<User[] | null> {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(200)
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.createUser(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('change-password')
  async changePassword(
    @Req() req: any,
    @Body() data: ChangePasswordDto,
  ): Promise<string | void> {
    if (req.user.userID) {
      const userId = req.user.userID;
      return this.userService.changePassword(userId, data);
    } else {
      throw new UnauthorizedException('ID no Token inválido.');
    }
  }
}
