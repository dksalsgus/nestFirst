import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from './member/member.module';
import { TodoModule } from './todo/todo.module';
import { PorfileModule } from './porfile/profile.module';
import { MulterModule } from '@nestjs/platform-express';
import path from 'path';
import multer, { diskStorage } from 'multer';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: '../upload',
          filename: function (req, file, callback) {
            callback(null, file.originalname);
          },
        }),
      }),
    }),
    MemberModule,
    TodoModule,
    PorfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
