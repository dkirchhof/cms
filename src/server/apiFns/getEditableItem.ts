import { ItemTypeConfigs } from "../../types/itemTypeConfig";
import { GetEditableItemBody } from "../../types/requestData";
import { findItemConfigByName } from "../../utils/findItemTypeConfig";
import { HTTPError } from "../types/httpError";
import { IRequest } from "../types/request";
import { IResponse } from "../types/response";

export const getEditableItem = async (req: IRequest<GetEditableItemBody>, res: IResponse, itemTypeConfigs: ItemTypeConfigs) => {
    const itemTypeConfig = findItemConfigByName(itemTypeConfigs, req.body.typeName);

    if (!itemTypeConfig) {
        throw new HTTPError(400, "couldn't find typeConfig");
    }

    const item = await itemTypeConfig.backend.api.getEditableItem(req.body.id);

    if (!item) {
        throw new HTTPError(404, "couldn't find item");
    }

    res.json(item);
};
