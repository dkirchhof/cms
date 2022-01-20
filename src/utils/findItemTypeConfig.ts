import { IItem, IItemTypeConfig } from "../types/itemTypeConfig";

export const findItemConfigByName = <T extends IItem>(itemTypeConfigs: IItemTypeConfig[], name: string) => {
    return itemTypeConfigs.find(config => config.name[0] === name || config.name[1] === name) as IItemTypeConfig<T> | undefined;
};
