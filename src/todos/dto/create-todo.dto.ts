import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;
}
