import { ItemTypeConfigs } from "../../shared/types/itemTypeConfig";
import { DeleteItemBody } from "../../shared/types/requestData";
import { findItemConfigByName } from "../../shared/utils/findItemTypeConfig";
import { HTTPError } from "../types/httpError";
import { IRequest } from "../types/request";
import { IResponse } from "../types/response";

export const deleteItem = async (req: IRequest<DeleteItemBody>, res: IResponse, itemTypeConfigs: ItemTypeConfigs) => {
    const itemTypeConfig = findItemConfigByName(itemTypeConfigs, req.body.typeName);

    if (!itemTypeConfig) {
        throw new HTTPError(400, "couldn't find typeConfig");
    }

    await itemTypeConfig.deleteItem(req.body.id);

    res.json({});
};
