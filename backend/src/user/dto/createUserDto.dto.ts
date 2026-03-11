import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator"

const minLength = 6

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: minLength,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {
        message: `Password is too weak. It must contain at least ${minLength} characters, one uppercase letter, one lowercase letter,
        one number, and one symbol`
    })
    password: string;

}