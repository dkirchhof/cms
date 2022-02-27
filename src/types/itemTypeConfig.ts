import { PropEditor } from "../editor/types/propEditor";
import { Localized } from "./i18n";

export type ItemTypeConfigs = IItemTypeConfig<any, any>[];

export type PropValidator<T> = (value: T) => string | null;

export interface IPropConfig<T> {
    label?: string;
    fullscreen?: boolean;
    editor: PropEditor<T>;
    defaultValue: T;
    validators: PropValidator<T>[];
}

export interface ILocalizedPropConfig<T> extends IPropConfig<T> {
    localize: true;
}

export type ListItemData = Record<string, any>;
export type EditorItemData = Record<string, any>;

export type EditorItemDataFieldToPropConfig<T> = T extends Localized<infer U, any>
    ? ILocalizedPropConfig<U>
    : IPropConfig<T>;

export interface IItemTypeConfig<LIST_ITEM_DATA extends ListItemData = any, EDITOR_ITEM_DATA extends EditorItemData = any> {
    name: [string, string];
    toString: (item: IItem<LIST_ITEM_DATA>) => string;

    listProps: (keyof LIST_ITEM_DATA)[];
    
    api: {
        getList: () => Promise<IItem<LIST_ITEM_DATA>[]>;
        getItem: (id: string) => Promise<IItem<EDITOR_ITEM_DATA>>;
        createItem: (values: EDITOR_ITEM_DATA) => Promise<string>;
        updateItem: (id: string, values: Partial<EDITOR_ITEM_DATA>) => Promise<void>;
        deleteItem: (id: string) => Promise<void>;
    };
    
    editor: {
        [prop in keyof EDITOR_ITEM_DATA]: EditorItemDataFieldToPropConfig<EDITOR_ITEM_DATA[prop]>;
    };
}

export interface IItem<DATA> {
    id: string;
    data: DATA;
}
