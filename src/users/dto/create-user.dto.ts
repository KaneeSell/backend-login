import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome é Obrigatório.' })
  @MinLength(4, { message: 'O nome deve ter no minimo 4 caracteres.' })
  name: string;
  @IsNotEmpty({ message: 'O e-mail é Obrigatório.' })
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  email: string;
  @IsNotEmpty({ message: 'A senha é Obrigatório.' })
  @MinLength(6, { message: 'A senha deve ter no minimo 6 caracteres.' })
  password: string;
}
