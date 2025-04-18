"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
let ItemsService = class ItemsService {
    items = [];
    idCounter = 1;
    create(createItemDto) {
        const item = { id: this.idCounter++, ...createItemDto };
        this.items.push(item);
        return item;
    }
    findAll() {
        return this.items;
    }
    findOne(id) {
        const item = this.items.find((i) => i.id === id);
        if (!item)
            throw new common_1.NotFoundException('Item not found');
        return item;
    }
    update(id, updateDto) {
        const item = this.findOne(id);
        Object.assign(item, updateDto);
        return item;
    }
    remove(id) {
        const index = this.items.findIndex((i) => i.id === id);
        if (index === -1)
            throw new common_1.NotFoundException('Item not found');
        this.items.splice(index, 1);
        return { deleted: true };
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)()
], ItemsService);
//# sourceMappingURL=items.service.js.map