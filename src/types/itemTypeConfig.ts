import { PropEditor } from "../editor/types/propEditor";

export type ItemTypeConfigs = IItemTypeConfig<any, any>[];

export type PropValidator<T> = (value: T) => string | null;

export interface IPropConfig<T> {
    label?: string;
    fullscreen?: boolean;
    editor: PropEditor<T>;
    defaultValue: T;
    validators: PropValidator<T>[];
}

export interface IItemTypeConfig<LIST_ITEM_DATA = any, EDITOR_ITEM_DATA = any> {
    name: [string, string];
    listProps: (keyof LIST_ITEM_DATA)[];
    
    api: {
        getList: () => Promise<IItem<LIST_ITEM_DATA>[]>;
        getItem: (id: string) => Promise<IItem<EDITOR_ITEM_DATA>>;
        createItem: (values: EDITOR_ITEM_DATA) => Promise<string>;
        updateItem: (id: string, values: Partial<EDITOR_ITEM_DATA>) => Promise<void>;
        deleteItem: (id: string) => Promise<void>;
    };
    
    editor: {
        [prop in keyof EDITOR_ITEM_DATA]: IPropConfig<EDITOR_ITEM_DATA[prop]>; 
    };
}

export interface IItem<DATA> {
    id: string;
    data: DATA;
}
