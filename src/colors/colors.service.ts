import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Color } from './color.entity';
import { ColorRepository } from './color.repository';
import { CreateColorDto } from './create-color.dto';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(ColorRepository) private colorRepository: ColorRepository,
  ) {}

  public async getColors(): Promise<Color[]> {
    return this.colorRepository.getColors();
  }

  public async deleteColor(id: number, user: User): Promise<void> {
    const result = await this.colorRepository.delete({ id: id });
    if (result.affected === 0)
      throw new NotFoundException(`Color with ID "${id}" not found.`);
  }

  public async createColor(
    createColorDto: CreateColorDto,
    user: User,
  ): Promise<Color> {
    return this.colorRepository.createColor(createColorDto, user);
  }
}
