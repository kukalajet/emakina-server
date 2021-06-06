import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManufacturerRepository } from '../manufacturers/manufacturer.repository';
import { User } from '../users/user.entity';
import { CreateModelDto } from './create-model.dto';
import { Model } from './model.entity';
import { ModelRepository } from './model.repository';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(ModelRepository)
    private modelRepository: ModelRepository,
    @InjectRepository(ManufacturerRepository)
    private manufacturerRepository: ManufacturerRepository,
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
    const manufacturer = await this.manufacturerRepository.findOne({
      id: createModelDto.manufacturer.id,
    });
    if (!manufacturer) {
      throw new NotFoundException(
        `Manufacturer with ID: "${createModelDto.manufacturer.id}" not found.`,
      );
    }

    return this.modelRepository.createModel(
      createModelDto.name,
      manufacturer,
      user,
    );
  }
}
