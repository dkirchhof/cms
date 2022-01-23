import { PropEditor } from "../editor/types/propEditor";

// export type GetItemType<T> = T extends IItemTypeConfig<infer U> ? U : never;

export type ItemTypeConfigs = IItemTypeConfig<any, any>[];

export type PropValidator<T> = (value: T) => string | null;

export interface IPropConfig<T> {
    label?: string;
    fullscreen?: boolean;
    editor: PropEditor<T>;
    defaultValue: T;
    validators: PropValidator<T>[];
}

export interface IItemTypeConfig<ENTITY extends IItem = IItem, EDITABLE_ITEM extends IItem = IItem> {
    name: [string, string];
    toString: (entity: ENTITY) => string;
    
    backend: {
        api: {
            getEntity: (id: string) => Promise<ENTITY>;
            getEntities: () => Promise<ENTITY[]>

            getEditableItem: (id: string) => Promise<EDITABLE_ITEM>;
            createItem: (values: EDITABLE_ITEM) => Promise<string>;
            updateItem: (id: string, values: Partial<EDITABLE_ITEM>) => Promise<void>;
            deleteItem: (id: string) => Promise<void>;
        };
    };
    
    frontend: {
        listProps: (keyof ENTITY)[];

        editor: {
            propConfigs: {
                [prop in keyof Omit<EDITABLE_ITEM, "id">]: IPropConfig<EDITABLE_ITEM[prop]>; 
            };
        };
    };
}

export interface IItem {
    id: string;
}
