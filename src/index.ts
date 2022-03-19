import { editorFactory } from "./editor";
import { createItemType, IItemType } from "./itemTypeBuilder";
import { createEditorType } from "./itemTypeBuilder/editorField";
import { createListType } from "./itemTypeBuilder/listField";

export const createItemTypeBuilder = <LOCALES extends string>(locales: readonly LOCALES[]) => ({
    createListType,
    createEditorType: createEditorType<LOCALES>(),
    createItemType: createItemType<LOCALES>(),
});

export const createCMS = (locales: readonly string[]) => {
    return {
        createEditor: (itemTypes: IItemType[]) => editorFactory(itemTypes, locales),
    };
};
