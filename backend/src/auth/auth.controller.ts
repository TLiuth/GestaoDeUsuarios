import { Controller, Post, Req, UseGuards, Res, HttpStatus, Get } from '@nestjs/common';
import type { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { UserEntity } from 'src/user/entities/user.entity';

// type SafeUser = Omit<UserEntity, 'password'>;
// interface RequestWithUser extends Request {
//   user: SafeUser;
// }

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request) {
    return { message: 'Logged in', user: req.user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get("ping")
  async pong(@Req() req: Request){
    return { ok: true, user: req.user ?? null };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {
      if (err) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Logout failed' });
      }

      if (!req.session) {
        return res.status(HttpStatus.OK).json({ message: 'Logged out' });
      }

      req.session.destroy((destroyErr) => {
        if (destroyErr) {
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: 'Session destruction failed' });
        }

        res.clearCookie('connect.sid');
        return res.status(HttpStatus.OK).json({ message: 'Logged out' });
      });
    });
  }
}