import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator"

const minLength = 6

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsStrongPassword({
        minLength: minLength,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {
        message: `Password is too weak. It must contain at least ${minLength} characters, one uppercase letter, one lowercase letter,
        one number, and one symbol.`
    })
    password?: string;

}