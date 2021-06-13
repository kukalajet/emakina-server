import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../users';
import { EntityRepository, Repository } from 'typeorm';
import { CreateManufacturerDto } from './create-manufacturer.dto';
import { Manufacturer } from './manufacturer.entity';
import { PaginationDto } from './pagination.dto';

@EntityRepository(Manufacturer)
export class ManufacturerRepository extends Repository<Manufacturer> {
  private logger = new Logger('ManufacturerRepository');

  public async getManufacturers(
    paginationDto: PaginationDto,
  ): Promise<Manufacturer[]> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    // const totalCount = await this.count();

    const query = this.createQueryBuilder('manufacturer')
      // .orderBy('createdAt', 'DESC')
      .offset(skippedItems)
      .limit(paginationDto.limit);

    try {
      const manufacturers = await query.getMany();
      return manufacturers;
    } catch (error) {
      this.logger.error(`Failed to get manufacturers.`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  public async createManufacturer(
    createManufacturerDto: CreateManufacturerDto,
    user: User,
  ) {
    const { name } = createManufacturerDto;

    const manufacturer = new Manufacturer();
    manufacturer.name = name;

    try {
      await manufacturer.save();
    } catch (error) {
      this.logger.error(
        `Failed to create manufacturer by user with ID "${
          user.id
        }". Data: ${JSON.stringify(createManufacturerDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return manufacturer;
  }
}
