import { IItemType } from "../itemTypeBuilder";

export const findItemConfigByName = <T extends IItemType>(itemTypeConfigs: T[], name: string) => {
    return itemTypeConfigs.find(config => config.name[0] === name || config.name[1] === name) as T | undefined;
};
