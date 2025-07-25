import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '../../generated/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    console.log('createUser...');
    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (userExists) {
      console.log('email ja existe.');
      throw new BadRequestException('Este E-mail já está cadastrado.');
    }
    const salt = 10;
    const passwordHashed = await bcrypt.hash(data.password, salt);
    return await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHashed,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    console.log('findByEmail...');
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findAll(): Promise<User[] | null> {
    console.log('findAll...');
    return await this.prisma.user.findMany();
  }

  async changePassword(id, data: ChangePasswordDto): Promise<string | void> {
    const userExists = await this.prisma.user.findUnique({ where: { id: id } });
    if (userExists) {
      const oldPasswordValid = await bcrypt.compare(
        data.currentPassword,
        userExists.password,
      );
      if (oldPasswordValid) {
        const salt = 10;
        const newPasswordHashed = await bcrypt.hash(data.newPassword, salt);
        await this.prisma.user.update({
          where: { id: id },
          data: { password: newPasswordHashed },
        });
        return 'Senha alterada com sucesso!';
      } else {
        throw new BadRequestException('Senha antiga não confere.');
      }
    } else {
      throw new UnauthorizedException('Não foi possivel alterar a senha.');
    }
  }
}
