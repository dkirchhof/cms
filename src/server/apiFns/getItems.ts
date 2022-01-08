import { GetItemsBody } from "../../shared/types/requestData";
import { findItemConfigByName } from "../../shared/utils/findItemTypeConfig";
import { HTTPError } from "../types/httpError";
import { ItemTypeAPIConfigs } from "../types/itemType";
import { IRequest } from "../types/request";
import { IResponse } from "../types/response";

export const getItems = async (req: IRequest<GetItemsBody>, res: IResponse, itemTypeConfigs: ItemTypeAPIConfigs) => {
    const itemTypeConfig = findItemConfigByName(itemTypeConfigs, req.body.typeName);

    if (!itemTypeConfig) {
        throw new HTTPError(400, "couldn't find typeConfig");
    }

    const items = await itemTypeConfig.getItems();

    res.json(items);
};
