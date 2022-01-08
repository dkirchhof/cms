import { IItem, IItemTypeBaseConfig } from "../../shared/types/itemTypeConfig";

export type ItemTypeAPIConfigs = IItemAPIConfig<any>[];

export interface IItemAPIConfig<T extends IItem> extends IItemTypeBaseConfig {
    getItem: (id: string) => Promise<T>;
    getItems: () => Promise<T[]>;
    createItem: (data: T) => Promise<T>;
    updateItem: (id: string, data: T) => Promise<T>;
    deleteItem: (id: string) => Promise<void>;
}
