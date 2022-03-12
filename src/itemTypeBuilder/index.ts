import { EditorFields, IEditorItem, IEditorType } from "./editorField";
import { IListItem, IListType } from "./listField";

export type Partial2<T> = {
    [P in keyof T]?: T[P] extends object 
        ? Partial<T[P]>
        : T[P]
}

export interface IItemTypeConfig<LIST_PROPS extends string = any, EDITOR extends EditorFields<any> = any, LOCALES extends string = any> {
    name: [string, string];
    toString: (item: IListItem<LIST_PROPS>) => string;

    listType: IListType<LIST_PROPS>;
    editorType: IEditorType<EDITOR, LOCALES>;

    api: {
        getList: () => Promise<IListItem<LIST_PROPS>[]>;

        getItem: (id: string) => Promise<IEditorItem<EDITOR, LOCALES> | undefined>;
        createItem: (values: IEditorItem<EDITOR, LOCALES>) => Promise<string>;
        updateItem: (id: string, values: Partial2<IEditorItem<EDITOR, LOCALES>>) => Promise<void>;
        deleteItem: (id: string) => Promise<void>;
    };
}

export type IItemTypeConfigForList<LIST_PROPS extends string> = IItemTypeConfig<LIST_PROPS, any, any>;
export type IItemTypeConfigForEditor<EDITOR extends EditorFields<any>> = IItemTypeConfig<any, EDITOR, any>;

export interface IItemType<LIST_PROPS extends string = any, EDITOR extends EditorFields<any> = any, LOCALES extends string = any> {
    config: IItemTypeConfig<LIST_PROPS, EDITOR, LOCALES>; 
}

export const createItemType = <LOCALES extends string>() => <LIST extends string = any, EDITOR extends EditorFields<any> = any>(
    config: IItemTypeConfig<LIST, EDITOR, LOCALES>
): IItemType<LIST, EDITOR, LOCALES> => ({
    config
});
