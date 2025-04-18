import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    create(dto: CreateItemDto): import("./item.interface").Item;
    findAll(): import("./item.interface").Item[];
    findOne(id: string): import("./item.interface").Item;
    update(id: string, dto: UpdateItemDto): import("./item.interface").Item;
    remove(id: string): {
        deleted: boolean;
    };
}
