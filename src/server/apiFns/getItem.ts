import { IItemType } from "../../itemTypeBuilder";
import { GetItemBody } from "../../types/requestData";
import { findItemConfigByName } from "../../utils/findItemTypeConfig";
import { HTTPError } from "../types/httpError";
import { IRequest } from "../types/request";
import { IResponse } from "../types/response";

export const getItem = async (req: IRequest<GetItemBody>, res: IResponse, itemTypeConfigs: IItemType[]) => {
    const itemTypeConfig = findItemConfigByName(itemTypeConfigs, req.body.typeName);

    if (!itemTypeConfig) {
        throw new HTTPError(400, "couldn't find typeConfig");
    }

    const item = await itemTypeConfig.api.getItem(req.body.id);

    res.json(item);
};
