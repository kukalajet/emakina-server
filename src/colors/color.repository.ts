import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Color } from './color.entity';
import { CreateColorDto } from './create-color.dto';

@EntityRepository(Color)
export class ColorRepository extends Repository<Color> {
  private logger = new Logger('ColorRepository');

  public async getColors(): Promise<Color[]> {
    const query = this.createQueryBuilder('color');

    try {
      const colors = await query.getMany();
      return colors;
    } catch (error) {
      this.logger.error(`Failed to retrieve colors.`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  public async createColor(createColorDto: CreateColorDto, user: User) {
    const { name, code } = createColorDto;

    const color = new Color();
    color.name = name;
    color.code = code;

    try {
      await color.save();
    } catch (error) {
      this.logger.error(
        `Failed to create color by user "${user.id}". Data: ${JSON.stringify(
          createColorDto,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return color;
  }
}
