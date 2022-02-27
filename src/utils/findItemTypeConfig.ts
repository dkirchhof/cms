import { EditorItemData, IItemTypeConfig, ItemTypeConfigs } from "../types/itemTypeConfig";

export const findItemConfigByName = <LIST_ITEM_DATA, EDITOR_ITEM_DATA extends EditorItemData>(itemTypeConfigs: ItemTypeConfigs, name: string) => {
    return itemTypeConfigs.find(config => config.name[0] === name || config.name[1] === name) as IItemTypeConfig<LIST_ITEM_DATA, EDITOR_ITEM_DATA> | undefined;
};
