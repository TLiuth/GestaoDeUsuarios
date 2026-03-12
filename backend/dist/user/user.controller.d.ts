import { CreateUserDto } from './dto/createUserDto.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<string>;
    alive(): Promise<string>;
}
