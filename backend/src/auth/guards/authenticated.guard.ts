import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthenticatedGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        if (req.isAuthenticated?.()) return true;
        throw new UnauthorizedException('Authentication required')
    }
}