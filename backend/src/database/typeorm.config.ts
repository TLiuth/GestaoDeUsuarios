import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? "5432", 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [UserEntity],
  synchronize: false,
  logging: process.env.TYPEORM_LOGGING === "true",
};