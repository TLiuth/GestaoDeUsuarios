import { BadRequestException, ConflictException, Injectable, Logger, Post, ServiceUnavailableException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from "bcrypt"
import { CreateUserDto } from './dto/createUserDto.dto';
import { useSearchParams } from 'next/navigation';


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

                return "User created succesfully"
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

    async findByEmailWithPassword(email: string){
        return await this.userRepository.findOne({ where: { email: email }, select: ['id', 'name', 'email', 'password']})
    }

    async findById(id: number){
        return await this.userRepository.findOne({where: { id: id}, select: ['id', 'name', 'email', 'password']})
    }

    async updateUser(userId: number, data: Partial<UserEntity>){
        const currentUser = await this.userRepository.findOne({ where: { id:userId }})
        if(!currentUser){
            throw new BadRequestException("User not found")
        }

        const updateData: Partial<UserEntity> = {}

        if(data.name !== undefined){
            updateData.name = data.name
        }

        if(data.email !== undefined) {
            const existing = await this.userRepository.findOne({ where: { email: data.email}});
            if(existing && existing.id !== userId){
                throw new ConflictException("This email is already registered");
            }
            updateData.email = data.email
        }
        
        if(data.password !== undefined){
            updateData.password = await hashPasswordFunc(data.password);
        }

        if(Object.keys(updateData).length === 0){
            throw new BadRequestException("No fields provided for update");
        }

        await this.userRepository.update({ id: userId }, updateData)

        return this.userRepository.findOne({
            where: { id: userId},
            select: ["id", "name", "email"]
        })
    }

    async deleteUser(userId: number, targetId: number){

        if(userId === targetId){
            throw new BadRequestException("A user cannot delete itself via this path")
        }
        const targetUser = await this.userRepository.findOne({ where: { id: targetId }, select: ["id", "name", "email"]})
        
        await this.userRepository.delete({ id:targetId })

        return `User deleted from database:\n- Id: ${targetUser?.id}\n- Name: ${targetUser?.name}\n- Email: ${targetUser?.email}`
    }

    async deleteItself(userId: number){
        const user = await this.userRepository.findOne({ where: { id: userId}, select: ["id"]})

        if(!user){
            throw new BadRequestException("User does not exist")
        }

        await this.userRepository.delete({ id:userId})

        return "Account deleted"
    }

    async getAllUsers(){
        const users = await this.userRepository.find({ select: ["id", "name", "email"]})

        return users
    }

    async getCurrentUser(id: number){
        return await this.userRepository.findOne({where: { id: id}, select: ['id', 'name', 'email']})
    }


}
