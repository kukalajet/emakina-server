import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/user.entity';
import { Color } from './color.entity';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './create-color.dto';

@Controller('colors')
export class ColorsController {
  private logger = new Logger('ColorsController');

  constructor(private colorsService: ColorsService) {}

  @Get()
  public getColors(): Promise<Color[]> {
    this.logger.verbose('Retrieve all colors');
    return this.colorsService.getColors();
  }

  @Post()
  @UseGuards(AuthGuard())
  public createColor(
    @Body() createColorDto: CreateColorDto,
    @GetUser() user: User,
  ): Promise<Color> {
    this.logger.verbose(
      `User "${user.id}" creating new color. Data: ${JSON.stringify(
        createColorDto,
      )}`,
    );
    return this.colorsService.createColor(createColorDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  public deleteColor(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.id}" deleting color with ID "${id}".`);
    return this.colorsService.deleteColor(id, user);
  }
}
