import { BadRequestException, ConflictException, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from "bcrypt"
import { CreateUserDto } from './dto/createUserDto.dto';

type UserType = {
    name: string,
    email: string,
    password: string
}

// Hash password before inserting or updating DB
async function hashPasswordFunc(password: string) {
    try{
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }catch(error){
        throw error;
    }
}

// Compare incoming password to DB hashed password (for authentication)
async function comparePassword(userPassword: string, passwordHash: string){
    try{
        const result = await bcrypt.compare(userPassword, passwordHash);
        return result;
    }catch(error){
        throw error;
    }

}
export { hashPasswordFunc, comparePassword }

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name)

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ){}

    async validateAndCreateUser(createUserDto: CreateUserDto){
        const { name, email, password } = createUserDto
        try{
            const existing = await this.userRepository.findOne({
                where: {
                    email: email
                }
            })

            if(existing){
                throw new ConflictException("This email is already registered");
            }

            if(password){
                const hashPassword = await hashPasswordFunc(password)
                const user: UserType = {
                    name: name,
                    email: email,
                    password: hashPassword,
                }

                const entity = this.userRepository.create(user)

                await this.userRepository.save(entity)
            }else{
                throw new BadRequestException(`Password is required to create user`)
            }

            
        }catch(error){
            if(error instanceof BadRequestException || error instanceof ConflictException){
                throw error
            }

            this.logger.log(`Unknow error: ${error}`)
            throw new ServiceUnavailableException("Failed to create user")

        }
    }


}
