import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginationDto {
  @Transform(location => parseInt(location))
  @IsNumber()
  page: number;

  @Transform(limit => parseInt(limit))
  @IsNumber()
  limit: number;
}
