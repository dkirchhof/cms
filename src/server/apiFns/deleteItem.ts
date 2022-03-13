import { IItemTypeConfig } from "../../itemTypeBuilder";
import { DeleteItemBody } from "../../types/requestData";
import { findItemConfigByName } from "../../utils/findItemTypeConfig";
import { HTTPError } from "../types/httpError";
import { IRequest } from "../types/request";
import { IResponse } from "../types/response";

export const deleteItem = async (req: IRequest<DeleteItemBody>, res: IResponse, itemTypeConfigs: IItemTypeConfig[]) => {
    const itemTypeConfig = findItemConfigByName(itemTypeConfigs, req.body.typeName);

    if (!itemTypeConfig) {
        throw new HTTPError(400, "couldn't find typeConfig");
    }

    await itemTypeConfig.api.deleteItem(req.body.id);

    res.end();
};
