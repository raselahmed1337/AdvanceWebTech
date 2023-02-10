import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class DoctorDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  password: string;
}
