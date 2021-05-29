import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateFuelDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  type: string;
}
