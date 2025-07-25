import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'E-mail não informado.' })
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  email: string;
  @IsNotEmpty({ message: 'A senha é Obrigatória.' })
  @MinLength(6, { message: 'A senha deve ter no minimo 6 caracteres.' })
  password: string;
}
