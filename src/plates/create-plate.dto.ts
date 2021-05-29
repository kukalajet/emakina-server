import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePlateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}
