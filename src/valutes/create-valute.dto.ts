import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateValuteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(3)
  symbol: string;
}
