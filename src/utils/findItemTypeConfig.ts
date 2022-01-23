import { IItem, IItemTypeConfig } from "../types/itemTypeConfig";

export const findItemConfigByName = <ENTITY extends IItem, EDITABLE_ITEM extends IItem>(itemTypeConfigs: IItemTypeConfig[], name: string) => {
    return itemTypeConfigs.find(config => config.name[0] === name || config.name[1] === name) as IItemTypeConfig<ENTITY, EDITABLE_ITEM> | undefined;
};
