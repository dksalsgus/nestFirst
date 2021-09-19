import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';

@Module({
  controllers: [HomeController],
  exports: [],
  imports: [],
  providers: [],
})
export class HomeModule {}
