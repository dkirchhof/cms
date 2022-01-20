import { ItemTypeConfigs } from "../../types/itemTypeConfig";
import { UpdateItemBody } from "../../types/requestData";
import { findItemConfigByName } from "../../utils/findItemTypeConfig";
import { HTTPError } from "../types/httpError";
import { IRequest } from "../types/request";
import { IResponse } from "../types/response";

export const updateItem = async (req: IRequest<UpdateItemBody<any>>, res: IResponse, itemTypeConfigs: ItemTypeConfigs) => {
    const itemTypeConfig = findItemConfigByName(itemTypeConfigs, req.body.typeName);

    if (!itemTypeConfig) {
        throw new HTTPError(400, "couldn't find typeConfig");
    }

    await itemTypeConfig.backend.api.updateItem(req.body.id, req.body.values);

    res.json({});
};
