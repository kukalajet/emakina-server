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
import { CreatePlateDto } from './create-plate.dto';
import { Plate } from './plate.entity';
import { PlatesService } from './plates.service';

@Controller('plates')
export class PlatesController {
  private logger = new Logger('PlatesController');

  constructor(private platesService: PlatesService) {}

  @Get()
  public getPlates() {
    this.logger.verbose('Retrieving all plates.');
    return this.platesService.getPlates();
  }

  @Post()
  @UseGuards(AuthGuard())
  public createPlate(
    @Body() createPlateDto: CreatePlateDto,
    @GetUser() user: User,
  ): Promise<Plate> {
    this.logger.verbose(
      `User "${user.firstName} ${
        user.lastName
      }" creating new plate. Data: ${JSON.stringify(createPlateDto)}.`,
    );
    return this.platesService.createPlate(createPlateDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  public deletePlate(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.id}" deleting plate with ID "${id}".`);
    return this.platesService.deletePlate(id, user);
  }
}
