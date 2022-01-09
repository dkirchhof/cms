import { ItemTypeConfigs } from "../../types/itemTypeConfig";
import { CreateItemBody } from "../../types/requestData";
import { findItemConfigByName } from "../../utils/findItemTypeConfig";
import { HTTPError } from "../types/httpError";
import { IRequest } from "../types/request";
import { IResponse } from "../types/response";

export const createItem = async (req: IRequest<CreateItemBody>, res: IResponse, itemTypeConfigs: ItemTypeConfigs) => {
    const itemTypeConfig = findItemConfigByName(itemTypeConfigs, req.body.typeName);

    if (!itemTypeConfig) {
        throw new HTTPError(400, "couldn't find typeConfig");
    }

    const item = await itemTypeConfig.createItem(req.body.newItemData);

    res.json(item);
};
