import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: process.env.SESSION_SECRET ?? 'dev-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 86400000},
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
