import { PropEditor } from "../editor/types/propEditor";

export type GetItemType<T> = T extends IItemTypeConfig<infer U> ? U : never;

export type GetLabel<T> = (type: T) => string;
export type GetTypeEditorInputs<T> = () => { [prop in keyof Omit<T, "id">]: PropEditor<T[prop]> | null };

export type ItemTypeConfigs = IItemTypeConfig<any>[];

export interface IItemTypeConfig<T extends IItem = IItem> {
    name: [string, string];

    getItem: (id: string) => Promise<T | null>;
    getItems: () => Promise<T[]>;
    createItem: (data: T) => Promise<T>;
    updateItem: (id: string, data: Partial<T>) => Promise<T>;
    deleteItem: (id: string) => Promise<void>;

    listProps: (keyof T)[];
    getLabel: GetLabel<T>;
    getEditorInputs: GetTypeEditorInputs<T>;
}

export interface IItem {
    id: string;
}
