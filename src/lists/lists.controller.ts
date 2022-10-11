import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuardJwt } from 'src/auth/auth-guard.jwt';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateListItemDto } from './create-list-item.dto';
import { CreateListDto } from './create-list.dto';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
  constructor(
    private readonly listsService: ListsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Get()
  async getLists() {
    return await this.listsService.getLists();
  }

  @Get(':id')
  async getList(@Param('id', ParseIntPipe) id: number) {
    const list = await this.listsService.getList(id);

    if (!list) {
      throw new NotFoundException();
    }

    return list;
  }

  @Post()
  @UseGuards(AuthGuardJwt)
  async createList(
    @Body() createListDto: CreateListDto,
    @CurrentUser() user: User,
  ) {
    return await this.listsService.createList(createListDto, user);
  }

  @Put(':id')
  @UseGuards(AuthGuardJwt)
  async addItemToList(
    @Param('id', ParseIntPipe) id: number,
    @Body() createListItemDto: CreateListItemDto,
    @CurrentUser() user: User,
  ) {
    const list = await this.listsService.getList(id);

    if (!list) {
      throw new NotFoundException();
    }

    if (!list.assignedUsers.find((u) => u.id === user.id)) {
      throw new ForbiddenException();
    }

    return await this.listsService.addItemToList(list, createListItemDto, user);
  }

  @Put(':listId/assign/:userId')
  @UseGuards(AuthGuardJwt)
  async assignUserToList(
    @Param('listId', ParseIntPipe) listId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @CurrentUser() assigner: User,
  ) {
    const list = await this.listsService.getList(listId);
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!list) {
      throw new NotFoundException();
    }

    if (!user) {
      throw new NotFoundException();
    }

    if (!list.assignedUsers.find((u) => u.id === assigner.id)) {
      throw new ForbiddenException();
    }

    if (!list.assignedUsers.find((u) => u.id === userId)) {
      await this.listsService.assignUserToList(user, list);
    }
  }
}
