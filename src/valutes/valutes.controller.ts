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
import { CreateValuteDto } from './create-valute.dto';
import { Valute } from './valute.entity';
import { ValutesService } from './valutes.service';

@Controller('valutes')
export class ValutesController {
  private logger = new Logger('ValutesController');

  constructor(private valutesService: ValutesService) {}

  @Get()
  public getValutes() {
    this.logger.verbose('Retrieving all valutes.');
    return this.valutesService.getValutes();
  }

  @Post()
  @UseGuards(AuthGuard())
  public createValute(
    @Body() createValuteDto: CreateValuteDto,
    @GetUser() user: User,
  ): Promise<Valute> {
    this.logger.verbose(
      `User "${user.firstName} ${
        user.lastName
      }" creating new valute. Data: ${JSON.stringify(createValuteDto)}.`,
    );
    return this.valutesService.createValute(createValuteDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  public deleteValute(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.id}" deleting valute with ID "${id}".`);
    return this.valutesService.deleteValute(id, user);
  }
}
