import { IItemType } from "../itemTypeBuilder";

export const findItemTypeByName = <T extends IItemType>(itemTypes: T[], name: string) => {
    return itemTypes.find(config => config.name[0] === name || config.name[1] === name) as T | undefined;
};
