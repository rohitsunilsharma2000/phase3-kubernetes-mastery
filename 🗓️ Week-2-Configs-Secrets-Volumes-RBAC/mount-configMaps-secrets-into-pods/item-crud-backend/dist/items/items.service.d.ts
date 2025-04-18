import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './item.interface';
export declare class ItemsService {
    private items;
    private idCounter;
    create(createItemDto: CreateItemDto): Item;
    findAll(): Item[];
    findOne(id: number): Item;
    update(id: number, updateDto: UpdateItemDto): Item;
    remove(id: number): {
        deleted: boolean;
    };
}
