import { ItemTypeConfigs } from "../../types/itemTypeConfig";
import { GetItemsBody } from "../../types/requestData";
import { findItemConfigByName } from "../../utils/findItemTypeConfig";
import { HTTPError } from "../types/httpError";
import { IRequest } from "../types/request";
import { IResponse } from "../types/response";

export const getItems = async (req: IRequest<GetItemsBody>, res: IResponse, itemTypeConfigs: ItemTypeConfigs) => {
    const itemTypeConfig = findItemConfigByName(itemTypeConfigs, req.body.typeName);

    if (!itemTypeConfig) {
        throw new HTTPError(400, "couldn't find typeConfig");
    }

    const items = await itemTypeConfig.getItems();

    res.json(items);
};
