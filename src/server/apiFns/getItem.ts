import { IItemTypeConfig } from "../../itemTypeBuilder";
import { GetItemBody } from "../../types/requestData";
import { findItemConfigByName } from "../../utils/findItemTypeConfig";
import { HTTPError } from "../types/httpError";
import { IRequest } from "../types/request";
import { IResponse } from "../types/response";

export const getItem = async (req: IRequest<GetItemBody>, res: IResponse, itemTypeConfigs: IItemTypeConfig[]) => {
    const itemTypeConfig = findItemConfigByName(itemTypeConfigs, req.body.typeName);

    if (!itemTypeConfig) {
        throw new HTTPError(400, "couldn't find typeConfig");
    }

    const item = await itemTypeConfig.api.getItem(req.body.id);

    if (!item) {
        throw new HTTPError(404, "couldn't find item");
    }

    res.json(item);
};
