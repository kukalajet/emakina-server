import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { CreateValuteDto } from './create-valute.dto';
import { Valute } from './valute.entity';
import { ValuteRepository } from './valute.repository';

@Injectable()
export class ValutesService {
  constructor(
    @InjectRepository(ValuteRepository)
    private valuteRepository: ValuteRepository,
  ) {}

  public async getValutes(): Promise<Valute[]> {
    return this.valuteRepository.getValutes();
  }

  public async deleteValute(id: number, user: User): Promise<void> {
    const result = await this.valuteRepository.delete({ id: id });
    if (result.affected === 0)
      throw new NotFoundException(`Valute with ID "${id}" not found.`);
  }

  public async createValute(
    createValuteDto: CreateValuteDto,
    user: User,
  ): Promise<Valute> {
    return this.valuteRepository.createValute(createValuteDto, user);
  }
}
