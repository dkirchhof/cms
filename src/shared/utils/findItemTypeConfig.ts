import { IItemTypeBaseConfig } from "../types/itemTypeConfig";

export const findItemConfigByName = <T extends IItemTypeBaseConfig>(itemTypeConfigs: T[], name: string) => {
    return itemTypeConfigs.find(config => config.name[0] === name || config.name[1] === name);
};
