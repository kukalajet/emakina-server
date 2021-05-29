import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../users';
import { EntityRepository, Repository } from 'typeorm';
import { CreateVehicleTypeDto } from './create-vehicle-type.dto';
import { VehicleType } from './vehicle-type.entity';

@EntityRepository(VehicleType)
export class VehicleTypeRepository extends Repository<VehicleType> {
  private logger = new Logger('VehicleTypeRepository');

  public async getVehicleTypes(): Promise<VehicleType[]> {
    const query = this.createQueryBuilder('type');

    try {
      const types = await query.getMany();
      return types;
    } catch (error) {
      this.logger.error(`Failed to get types.`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  public async createVehicleType(
    createVehicleTypeDto: CreateVehicleTypeDto,
    user: User,
  ) {
    const { name } = createVehicleTypeDto;

    const type = new VehicleType();
    type.name = name;

    try {
      await type.save();
    } catch (error) {
      this.logger.error(
        `Failed to create type by user "${user.firstName} ${
          user.lastName
        }". Data: ${JSON.stringify(createVehicleTypeDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return type;
  }
}
