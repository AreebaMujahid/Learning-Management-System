import { IsEmail, IsNotEmpty, IsEnum, MinLength } from 'class-validator';
import { Role } from 'src/utils/enums/roles';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsNotEmpty()
  @IsEnum(Role, { message: 'Role must be either mentor or learner' })
  role: Role;
}