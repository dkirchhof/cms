import { EditorFields, IEditorItem } from "./editorField";
import { IListItem } from "./listField";

export interface IItemTypeConfig<LIST_PROPS extends string = any, EDITOR extends EditorFields<any> = any, LOCALES extends string = any> {
    name: [string, string];
    toString: (item: IListItem<LIST_PROPS>) => string;

    list: readonly LIST_PROPS[];
    editor: EDITOR;

    api: {
        getList: () => Promise<IListItem<LIST_PROPS>[]>;

        getItem: (id: string) => Promise<IEditorItem<EDITOR, LOCALES>>;
        createItem: (values: IEditorItem<EDITOR, LOCALES>) => Promise<string>;
        updateItem: (id: string, values: Partial<IEditorItem<EDITOR, LOCALES>>) => Promise<void>;
        deleteItem: (id: string) => Promise<void>;
    };
}

export type IItemTypeConfigForList<LIST_PROPS extends string> = IItemTypeConfig<LIST_PROPS, any, any>;
export type IItemTypeConfigForEditor<EDITOR extends EditorFields<any>> = IItemTypeConfig<any, EDITOR, any>;

export interface IItemType<LIST_PROPS extends string = any, EDITOR extends EditorFields<any> = any, LOCALES extends string = any> {
    config: IItemTypeConfig<LIST_PROPS, EDITOR, LOCALES>; 
    listItem: { t: IListItem<LIST_PROPS>; };
    editorItem: { t: IEditorItem<EDITOR, LOCALES>; };
}

export const createItemType = <LOCALES extends string>() => <LIST extends string = any, EDITOR extends EditorFields<any> = any>(
    config: IItemTypeConfig<LIST, EDITOR, LOCALES>
): IItemType<LIST, EDITOR, LOCALES> => ({
    config,
    listItem: { t: null as any },
    editorItem: { t: null as any },
});
