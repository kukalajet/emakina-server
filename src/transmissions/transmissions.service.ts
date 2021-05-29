import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users';
import { CreateTransmissionDto } from './create-transmission.dto';
import { Transmission } from './transmission.entity';
import { TransmissionRepository } from './transmission.repository';

@Injectable()
export class TransmissionsService {
  constructor(
    @InjectRepository(TransmissionRepository)
    private transmissionRepository: TransmissionRepository,
  ) {}

  public async getTransmissions(): Promise<Transmission[]> {
    return this.transmissionRepository.getTransmissions();
  }

  public async deleteTransmission(id: number, user: User): Promise<void> {
    const result = await this.transmissionRepository.delete({ id: id });
    if (result.affected === 0)
      throw new NotFoundException(`Transmission with ID "${id}" not found.`);
  }

  public async createTransmission(
    createTransmissionDto: CreateTransmissionDto,
    user: User,
  ): Promise<Transmission> {
    return this.transmissionRepository.createTransmission(
      createTransmissionDto,
      user,
    );
  }
}
