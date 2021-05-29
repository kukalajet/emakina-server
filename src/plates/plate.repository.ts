import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../users';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePlateDto } from './create-plate.dto';
import { Plate } from './plate.entity';

@EntityRepository(Plate)
export class PlateRepository extends Repository<Plate> {
  private logger = new Logger('PlateRepository');

  public async getPlates(): Promise<Plate[]> {
    const query = this.createQueryBuilder('plate');

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
