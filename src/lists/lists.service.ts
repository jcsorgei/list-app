import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateListItemDto } from './create-list-item.dto';
import { CreateListDto } from './create-list.dto';
import { ListItem } from './list-item.entity';
import { List } from './list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private readonly listsRepository: Repository<List>,
    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,
  ) {}

  public async createList(
    createListDto: CreateListDto,
    user: User,
  ): Promise<List> {
    const list = new List();

    list.name = createListDto.name;
    list.assignedUsers = [user];

    return await this.listsRepository.save(list);
  }

  public async getList(id: number): Promise<List | undefined> {
    return await this.listsRepository.findOne({
      where: { id },
      relations: { assignedUsers: true },
    });
  }

  public async getLists(): Promise<List[]> {
    return await this.listsRepository.find({ relations: { items: true } });
  }

  public async addItemToList(
    list: List,
    createListItemDto: CreateListItemDto,
    user: User,
  ): Promise<ListItem> {
    const listItem = new ListItem();

    listItem.title = createListItemDto.title;
    listItem.creatorId = user.id;
    listItem.freeText = createListItemDto.freeText;
    listItem.deadLine = new Date(createListItemDto.deadLine);
    listItem.status = createListItemDto.status;
    listItem.list = list;

    return await this.listItemRepository.save(listItem);
  }
}
