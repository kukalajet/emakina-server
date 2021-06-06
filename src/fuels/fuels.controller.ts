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
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/user.entity';
import { Fuel } from './fuel.entity';
import { FuelsService } from './fuels.service';
import { CreateFuelDto } from './create-fuel.dto';

@Controller('fuels')
export class FuelsController {
  private logger = new Logger('FuelsController');

  constructor(private fuelsService: FuelsService) {}

  @Get()
  public getFuels(): Promise<Fuel[]> {
    this.logger.verbose('Retrieve all fuels');
    return this.fuelsService.getFuels();
  }

  @Post()
  @UseGuards(AuthGuard())
  public createFuel(
    @Body(ValidationPipe) createFuelDto: CreateFuelDto,
    @GetUser() user: User,
  ): Promise<Fuel> {
    this.logger.verbose(
      `User "${user.id}" creating new fuel. Data: ${JSON.stringify(
        createFuelDto,
      )}`,
    );
    return this.fuelsService.createFuel(createFuelDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  public deleteFuel(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.id}" deleting fuel with ID "${id}".`);
    return this.fuelsService.deleteFuel(id, user);
  }
}
