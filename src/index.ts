import { editorFactory } from "./editor";
import { createItemType, IItemType } from "./itemTypeBuilder";
import { requestHandlerFactory } from "./server";

export const createItemTypeBuilder = <LOCALES extends string>(locales: readonly LOCALES[]) => ({
    createItemType: createItemType<LOCALES>(),
});

export const createCMS = (locales: readonly string[]) => {
    return {
        createEditor: (itemTypes: IItemType[]) => editorFactory(itemTypes.map(itemType => itemType.config), locales),
        createAPI: (itemTypes: IItemType[]) => requestHandlerFactory(itemTypes.map(itemType => itemType.config)),
    };
};
