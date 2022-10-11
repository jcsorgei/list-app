import { IsString, Length } from 'class-validator';

export class CreateListDto {
  @IsString()
  @Length(5, 255, {
    message: 'The name length should be between 5 and 255 characters',
  })
  name: string;
}
