import { editorFactory } from "./editor";
import { createItemType, IItemType } from "./itemTypeBuilder";
import { createEditorType } from "./itemTypeBuilder/editorField";
import { createListType } from "./itemTypeBuilder/listField";
import { requestHandlerFactory } from "./server";
import { ILocales } from "./types/i18n";

export const createItemTypeBuilder = <LOCALES extends string>(locales: ILocales<LOCALES>) => ({
    createListType,
    createEditorType: createEditorType<LOCALES>(),
    createItemType: createItemType<LOCALES>(),
});

export const createCMS = <LOCALES extends string>(locales: ILocales<LOCALES>) => {
    return {
        createEditor: (itemTypes: IItemType[]) => editorFactory(itemTypes, locales.locales),
        createAPI: (itemTypes: IItemType[]) => requestHandlerFactory(itemTypes),

        getCurrentLocale: (context: { locale?: string; }) => context.locale as LOCALES, 
    };
};
