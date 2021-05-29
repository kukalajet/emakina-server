import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../users';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTransmissionDto } from './create-transmission.dto';
import { Transmission } from './transmission.entity';

@EntityRepository(Transmission)
export class TransmissionRepository extends Repository<Transmission> {
  private logger = new Logger('TransmissionRepository');

  public async getTransmissions(): Promise<Transmission[]> {
    const query = this.createQueryBuilder('transmission');

    try {
      const transmissions = await query.getMany();
      return transmissions;
    } catch (error) {
      this.logger.error('Failed to retrieve transmissions.', error.stack);
      throw new InternalServerErrorException();
    }
  }

  public async createTransmission(
    createTransmissionDto: CreateTransmissionDto,
    user: User,
  ): Promise<Transmission> {
    const { type } = createTransmissionDto;

    const transmission = new Transmission();
    transmission.type = type;

    try {
      await transmission.save();
    } catch (error) {
      this.logger.error(
        `Failed to create transmission by user with ID "${
          user.id
        }". Data: ${JSON.stringify(createTransmissionDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return transmission;
  }
}
