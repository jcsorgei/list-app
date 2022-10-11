import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { ListItem } from './list-item.entity';
import { List } from './list.entity';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  imports: [TypeOrmModule.forFeature([List, ListItem, User])],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
