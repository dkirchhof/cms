import { CreateItemBody } from "../../shared/types/requestData";
import { findItemConfigByName } from "../../shared/utils/findItemTypeConfig";
import { HTTPError } from "../types/httpError";
import { ItemTypeAPIConfigs } from "../types/itemType";
import { IRequest } from "../types/request";
import { IResponse } from "../types/response";

export const createItem = async (req: IRequest<CreateItemBody>, res: IResponse, itemTypeConfigs: ItemTypeAPIConfigs) => {
    const itemTypeConfig = findItemConfigByName(itemTypeConfigs, req.body.typeName);

    if (!itemTypeConfig) {
        throw new HTTPError(400, "couldn't find typeConfig");
    }

    const item = await itemTypeConfig.createItem(req.body.newItemData);

    res.json(item);
};
