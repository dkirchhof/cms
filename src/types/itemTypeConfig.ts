import { PropEditor } from "../editor/types/propEditor";
import { BlockConfigs, IBlock } from "./block";

// export type GetItemType<T> = T extends IItemTypeConfig<infer U> ? U : never;

export type ItemTypeConfigs = IItemTypeConfig<any>[];

export type PropValidator<T> = (value: T) => string | null;

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
            createItem: (values: T) => Promise<string>;
            updateItem: (id: string, values: T) => Promise<void>;
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
