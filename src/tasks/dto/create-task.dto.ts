import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  readonly name: string;


  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  readonly description: string;
}