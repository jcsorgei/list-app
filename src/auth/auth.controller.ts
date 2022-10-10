import {
  Controller,
  Post,
  UseGuards,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { AuthGuardLocal } from './auth-guard.local';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuardLocal)
  async login(@CurrentUser() user: User) {
    return {
      userId: user.id,
      token: this.authService.getTokenForUser(user),
    };
  }

  @Post('register')
  async register(@Body() user: User) {
    const existingUser = await this.userRepository.findOne({
      where: { username: user.username },
    });

    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const newUser = new User();

    newUser.username = user.username;
    newUser.password = await this.authService.hashPassword(user.password);

    return {
      ...(await this.userRepository.save(newUser)),
      token: this.authService.getTokenForUser(newUser),
    };
  }
}
