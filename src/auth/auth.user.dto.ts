import { IsString, Length } from 'class-validator';

export class AuthUserDto {
  @Length(5)
  @IsString()
  username: string;
  @Length(8)
  @IsString()
  password: string;
}
