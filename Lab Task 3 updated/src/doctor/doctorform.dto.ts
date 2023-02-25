import { IsNotEmpty, IsEmail, MinLength, IsString, MaxLength, IsPhoneNumber } from "class-validator";

export class DoctorForm {   
   @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    age : number;

    @IsNotEmpty()
    collegeName : string;
    
    @IsNotEmpty()
    specialist : string;
    
    @MaxLength(11)
    phoneNumber : string;

    @IsEmail() 
    email: string;

    @MinLength(8)
    password: string;
 
    @IsString()
    blog: string;



}