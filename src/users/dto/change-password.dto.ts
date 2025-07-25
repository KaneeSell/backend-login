import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'A senha antiga é Obrigatória.' })
  @IsString({ message: 'Senha antiga Inválida.' })
  currentPassword: string;

  @IsNotEmpty({ message: 'A senha nova é Obrigatória.' })
  @IsString({ message: 'Senha nova Inválida.' })
  @MinLength(6, { message: 'A senha deve ter no minimo 6 caracteres.' })
  newPassword: string;
}
