import { IsNotEmpty, IsEmail, MinLength, IsString, MaxLength, IsPhoneNumber } from "class-validator";

export class BlogForm {   
   @IsNotEmpty()
    blogtitle: string;

    @IsNotEmpty()
    blogpost : number;


}