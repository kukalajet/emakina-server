import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { CreateModelDto } from './create-model.dto';
import { Model } from './model.entity';
import { ModelRepository } from './model.repository';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(ModelRepository)
    private modelRepository: ModelRepository,
  ) {}

  public async getModels(): Promise<Model[]> {
    return this.modelRepository.getModels();
  }

  public async deleteModel(id: number, user: User): Promise<void> {
    const result = await this.modelRepository.delete({ id: id });
    if (result.affected === 0)
      throw new NotFoundException(`Model with ID "${id}" not found.`);
  }

  public async createModel(
    createModelDto: CreateModelDto,
    user: User,
  ): Promise<Model> {
    return this.modelRepository.createModel(createModelDto, user);
  }
}
