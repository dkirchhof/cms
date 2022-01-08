import { PropEditor } from "../../editor/types/propEditor";

export type MinimalType<T> = T extends IItemTypeConfig<infer Minimal, any> ? Minimal : never;
export type FullType<T> = T extends IItemTypeConfig<any, infer Full> ? Full : never;

export type GetLabel<T> = (type: T) => string;
export type GetTypeEditorInputs<T> = () => { [prop in keyof Omit<T, "id">]: PropEditor<T[prop]> | null };

export type ItemTypeConfigs = IItemTypeConfig<any, any>[];

export interface IItemTypeConfig<MINIMAL extends IItem = IItem, FULL extends MINIMAL = any> {
    name: [string, string];

    getItem: (id: string) => Promise<FULL | null>;
    getItems: () => Promise<MINIMAL[]>;
    createItem: (data: FULL) => Promise<FULL>;
    updateItem: (id: string, data: Partial<FULL>) => Promise<FULL>;
    deleteItem: (id: string) => Promise<void>;

    listProps: (keyof MINIMAL)[];
    getLabel: GetLabel<FULL>;
    getEditorInputs: GetTypeEditorInputs<FULL>;
}

export interface IItem {
    id: string;
}
