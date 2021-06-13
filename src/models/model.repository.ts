import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../users';
import { EntityRepository, Repository } from 'typeorm';
import { CreateModelDto } from './create-model.dto';
import { Model } from './model.entity';
import { ManufacturersModule } from 'src/manufacturers/manufacturers.module';
import { Manufacturer } from '../manufacturers';
import { PaginationDto } from './pagination.dto';

@EntityRepository(Model)
export class ModelRepository extends Repository<Model> {
  private logger = new Logger('ModelRepository');

  public async getModels(paginationDto: PaginationDto): Promise<Model[]> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    // const totalCount = await this.count();

    const query = this.createQueryBuilder('model')
      // .orderBy('createdAt', 'DESC')
      .offset(skippedItems)
      .limit(paginationDto.limit);

    try {
      const models = await query.getMany();
      return models;
    } catch (error) {
      this.logger.error(`Failed to get models.`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  public async createModel(
    name: string,
    manufacturer: Manufacturer,
    user: User,
  ) {
    const model = new Model();
    model.name = name;
    model.manufacturer = manufacturer;

    try {
      await model.save();
    } catch (error) {
      this.logger.error(
        `Failed to create model by user with ID "${
          user.id
        }". Data: ${JSON.stringify(model)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return model;
  }
}
