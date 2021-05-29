import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateColorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  code: string;
}
