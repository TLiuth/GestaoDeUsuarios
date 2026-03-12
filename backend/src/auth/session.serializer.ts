import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userService: UserService){
        super();
    }

    serializeUser(user: any, done: (err: Error | null, id?: number) => void){
        done(null, user.id)
    }

    async deserializeUser(
        id: number,
        done: (err: Error | null, user?: any) => void,
    ){
        const user = await this.userService.findById(id);
        done(null, user ?? null);
    }
}

// ! Add more error treatment later