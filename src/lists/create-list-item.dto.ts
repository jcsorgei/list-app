import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ItemStatus } from './list-item.entity';

export class CreateListItemDto {
  @IsString()
  @Length(5, 30, {
    message: 'The title length should be between 5 and 30 characters',
  })
  title: string;
  @IsString()
  @Length(5, 200, {
    message: 'The free text length should be between 5 and 200 characters',
  })
  freeText: string;
  @IsDateString()
  deadLine: string;
  @IsEnum(ItemStatus)
  @IsOptional()
  status?: ItemStatus;
}
