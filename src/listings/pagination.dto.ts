import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @Transform(page => parseInt(page))
  @IsOptional()
  @IsNumber()
  page: number;

  @Transform(limit => parseInt(limit))
  @IsOptional()
  @IsNumber()
  limit: number;
}
