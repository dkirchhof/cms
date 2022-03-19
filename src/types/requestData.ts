import { IItemType } from "../itemTypeBuilder";

export interface IRequestBody {
    fn: keyof IItemType["api"];
    itemType: string;
    params: readonly any[];
}
