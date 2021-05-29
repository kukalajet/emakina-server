import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../users';
import { EntityRepository, Repository } from 'typeorm';
import { CreateValuteDto } from './create-valute.dto';
import { Valute } from './valute.entity';

@EntityRepository(Valute)
export class ValuteRepository extends Repository<Valute> {
  private logger = new Logger('ValuteRepository');

  public async getValutes(): Promise<Valute[]> {
    const query = this.createQueryBuilder('valute');

    try {
      const valutes = await query.getMany();
      return valutes;
    } catch (error) {
      this.logger.error(`Failed to get valutes.`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  public async createValute(createValuteDto: CreateValuteDto, user: User) {
    const { name, symbol } = createValuteDto;

    const valute = new Valute();
    valute.name = name;
    valute.symbol = symbol;

    try {
      await valute.save();
    } catch (error) {
      this.logger.error(
        `Failed to create valute by user with ID "${
          user.id
        }". Data: ${JSON.stringify(createValuteDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return valute;
  }
}
