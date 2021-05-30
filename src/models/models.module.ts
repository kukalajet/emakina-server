import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ModelRepository } from './model.repository';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModelRepository]), AuthModule],
  controllers: [ModelsController],
  providers: [ModelsService],
})
export class ModelsModule {}
