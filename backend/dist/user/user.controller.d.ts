import { CreateUserDto } from './dto/createUserDto.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUserDto.dto copy';
type AuthRequest = Request & {
    user?: {
        id: number;
    };
};
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<string>;
    alive(): Promise<string>;
    update(req: AuthRequest, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").UserEntity | null>;
    deleteUser(req: AuthRequest, targetId: number): Promise<string>;
    deleteItself(req: AuthRequest): Promise<string>;
    getAllUsers(): Promise<import("./entities/user.entity").UserEntity[]>;
    getCurrentUser(req: AuthRequest): Promise<import("./entities/user.entity").UserEntity | null>;
}
export {};
