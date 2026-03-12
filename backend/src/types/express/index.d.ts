import { UserEntity } from "src/user/entities/user.entity";


declare global {
    namespace Express {
        interface User extends Omit<UserEntity, "password"> {}

        interface Request {
            user?: User;
        }
    }
}

export {}