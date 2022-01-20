import { PropEditor } from "../editor/types/propEditor";
import { BlockConfigs, IBlock } from "./block";

// export type GetItemType<T> = T extends IItemTypeConfig<infer U> ? U : never;

export type ItemTypeConfigs = IItemTypeConfig<any>[];

export type PropValidator<T> = (value: T) => string | null;

export type Value<T, P extends keyof T> = { prop: P; value: T[P]; }
export type Values<T> = Value<T, any>[];

export interface IPropConfig<T> {
    editor: PropEditor<T>;
    defaultValue: T;
    validators: PropValidator<T>[];
}

export interface IBlockPropConfig extends IPropConfig<IBlock> {
    blockConfigs: BlockConfigs;
}

export interface IItemTypeConfig<T extends IItem = IItem> {
    name: [string, string];
    
    backend: {
        api: {
            getItem: (id: string) => Promise<T>;
            getItems: () => Promise<T[]>;
            createItem: (values: Values<T>) => Promise<T>;
            updateItem: (id: string, values: Values<T>) => Promise<T>;
            deleteItem: (id: string) => Promise<void>;
        };
    };
    
    frontend: {
        listProps: (keyof T)[];

        editor: {
            propConfigs: {
                [prop in keyof Omit<T, "id">]: IPropConfig<T[prop]> | IBlockPropConfig; 
            };
        };
    };
}

export interface IItem {
    id: string;
}
