import { IItemTypeConfig } from "../itemTypeBuilder";

export const findItemConfigByName = <T extends IItemTypeConfig>(itemTypeConfigs: T[], name: string) => {
    return itemTypeConfigs.find(config => config.name[0] === name || config.name[1] === name) as T | undefined;
};
