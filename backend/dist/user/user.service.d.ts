import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto.dto';
declare function hashPasswordFunc(password: string): Promise<string>;
declare function comparePassword(userPassword: string, passwordHash: string): Promise<boolean>;
export { hashPasswordFunc, comparePassword };
export declare class UserService {
    private userRepository;
    private readonly logger;
    constructor(userRepository: Repository<UserEntity>);
    validateAndCreateUser(createUserDto: CreateUserDto): Promise<string>;
    findByEmailWithPassword(email: string): Promise<UserEntity | null>;
    findById(id: number): Promise<UserEntity | null>;
    updateUser(userId: number, data: Partial<UserEntity>): Promise<UserEntity | null>;
    deleteUser(userId: number, targetId: number): Promise<string>;
    deleteItself(userId: number): Promise<string>;
    getAllUsers(): Promise<UserEntity[]>;
    getCurrentUser(id: number): Promise<UserEntity | null>;
}
