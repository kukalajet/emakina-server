import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../users';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePlateDto } from './create-plate.dto';
import { Plate } from './plate.entity';
import { PaginationDto } from './pagination.dto';

@EntityRepository(Plate)
export class PlateRepository extends Repository<Plate> {
  private logger = new Logger('PlateRepository');

  public async getPlates(paginationDto: PaginationDto): Promise<Plate[]> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    // const totalCount = await this.count();

    const query = this.createQueryBuilder('plate')
      // .orderBy('createdAt', 'DESC')
      .offset(skippedItems)
      .limit(paginationDto.limit);

    try {
      const plates = await query.getMany();
      return plates;
    } catch (error) {
      this.logger.error(`Failed to get plates.`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  public async createPlate(createPlateDto: CreatePlateDto, user: User) {
    const { name } = createPlateDto;

    const plate = new Plate();
    plate.name = name;

    try {
      await plate.save();
    } catch (error) {
      this.logger.error(
        `Failed to create plate by user "${user.firstName} ${
          user.lastName
        }". Data: ${JSON.stringify(createPlateDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return plate;
  }
}
