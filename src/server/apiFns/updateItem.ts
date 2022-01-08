import { ItemTypeConfigs } from "../../shared/types/itemTypeConfig";
import { UpdateItemBody } from "../../shared/types/requestData";
import { findItemConfigByName } from "../../shared/utils/findItemTypeConfig";
import { HTTPError } from "../types/httpError";
import { IRequest } from "../types/request";
import { IResponse } from "../types/response";

export const updateItem = async (req: IRequest<UpdateItemBody>, res: IResponse, itemTypeConfigs: ItemTypeConfigs) => {
    const itemTypeConfig = findItemConfigByName(itemTypeConfigs, req.body.typeName);

    if (!itemTypeConfig) {
        throw new HTTPError(400, "couldn't find typeConfig");
    }

    const item = await itemTypeConfig.updateItem(req.body.id, req.body.updatedItemData);

    res.json(item);
};
