import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name)
    constructor(private readonly userService: UserService){}

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.validateAndCreateUser(createUserDto)
    }

    @Get("alive")
    async alive(){
        return "Alive"
    }
}
