import { IsNotEmpty, IsEmail, MinLength, IsString } from "class-validator";

export class DoctorForm {   
   @IsNotEmpty()
    name: string;
   
   @IsEmail() 
    email: string;

    @MinLength(8)
    password: string;
 
    @IsString()
    address: string;



}