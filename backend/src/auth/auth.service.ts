import { Injectable, UnauthorizedException } from '@nestjs/common';
import { comparePassword, UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    async validateUser(email: string, plainPassword: string) {
        const user = await this.userService.findByEmailWithPassword(email);

        if(!user || !user.password) throw new UnauthorizedException("Invalid credentials");
        

        const ok = await comparePassword(plainPassword, user.password)
        if(!ok) throw new UnauthorizedException("Invalid credentials");

        const { password, ...safeUser} = user;
        return safeUser;
    }
}
