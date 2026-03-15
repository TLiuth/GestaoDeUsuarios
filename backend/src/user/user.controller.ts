import { Body, Controller, Get, Logger, ParseIntPipe, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto.dto';
import { UserService } from './user.service';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { UpdateUserDto } from './dto/updateUserDto.dto copy';

type AuthRequest = Request & { user?: { id: number } };

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

    @UseGuards(AuthenticatedGuard)
    @Post('update')
    async update(@Req() req: AuthRequest, @Body() updateUserDto: UpdateUserDto){
        const userId = req.user?.id;
        if(!userId) throw new UnauthorizedException('User not authenticated')

        return this.userService.updateUser(userId, updateUserDto)
    }

    @UseGuards(AuthenticatedGuard)
    @Post('delete')
    async deleteUser(@Req() req: AuthRequest, @Body("targetId", ParseIntPipe) targetId: number ){
        const userId = req.user?.id;
        if (!userId) throw new UnauthorizedException("User not authenticated")

        return this.userService.deleteUser(userId, targetId)
    }

    @UseGuards(AuthenticatedGuard)
    @Post('deleteItself')
    async deleteItself(@Req() req: AuthRequest){
        const userId = req.user?.id;
        if (!userId) throw new UnauthorizedException("User not authenticated")

        return this.userService.deleteItself(userId)
    }

    @UseGuards(AuthenticatedGuard)
    @Get('getAllUsers')
    async getAllUsers(){
        return this.userService.getAllUsers()
    }

}
