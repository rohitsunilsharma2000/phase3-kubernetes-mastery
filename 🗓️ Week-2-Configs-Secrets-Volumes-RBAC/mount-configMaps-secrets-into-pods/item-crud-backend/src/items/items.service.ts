import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './item.interface'; // Import the interface

@Injectable()
export class ItemsService {
  private items: Item[] = []; // Set the correct type
  private idCounter = 1;

  create(createItemDto: CreateItemDto): Item {
    const item: Item = { id: this.idCounter++, ...createItemDto };
    this.items.push(item);
    return item;
  }

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: number): Item {
    const item = this.items.find((i) => i.id === id);
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  update(id: number, updateDto: UpdateItemDto): Item {
    const item = this.findOne(id);
    Object.assign(item, updateDto);
    return item;
  }

  remove(id: number): { deleted: boolean } {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) throw new NotFoundException('Item not found');
    this.items.splice(index, 1);
    return { deleted: true };
  }
}
