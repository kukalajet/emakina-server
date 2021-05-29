import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../users';
import { EntityRepository, Repository } from 'typeorm';
import { CreateFuelDto } from './create-fuel.dto';
import { Fuel } from './fuel.entity';

@EntityRepository(Fuel)
export class FuelRepository extends Repository<Fuel> {
  private logger = new Logger('FuelRepository');

  public async getFuels(): Promise<Fuel[]> {
    const query = this.createQueryBuilder('fuel');

    try {
      const fuels = await query.getMany();
      return fuels;
    } catch (error) {
      this.logger.error('Failed to retrieve fuels.', error.stack);
      throw new InternalServerErrorException();
    }
  }

  public async createFuel(
    createFuelDto: CreateFuelDto,
    user: User,
  ): Promise<Fuel> {
    const { type } = createFuelDto;

    const fuel = new Fuel();
    fuel.type = type;

    try {
      await fuel.save();
    } catch (error) {
      this.logger.error(
        `Failed to create fuel by user with ID "${
          user.id
        }". Data: ${JSON.stringify(createFuelDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return fuel;
  }
}
