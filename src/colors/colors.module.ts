import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ColorRepository } from './color.repository';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';

@Module({
  imports: [TypeOrmModule.forFeature([ColorRepository]), AuthModule],
  controllers: [ColorsController],
  providers: [ColorsService],
})
export class ColorsModule {}
