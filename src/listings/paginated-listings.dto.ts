import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Listing } from './listing.entity';

export class PaginatedListingsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Listing)
  data: Listing[];

  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;

  @IsNumber()
  totalCount: number;
}
