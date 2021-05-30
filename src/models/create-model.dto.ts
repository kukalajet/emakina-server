import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}
