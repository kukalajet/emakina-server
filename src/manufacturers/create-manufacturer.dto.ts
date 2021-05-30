import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateManufacturerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}
