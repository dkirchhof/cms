import { ItemTypeConfigs } from "../../types/itemTypeConfig";
import { GetItemForEditingBody } from "../../types/requestData";
import { findItemConfigByName } from "../../utils/findItemTypeConfig";
import { HTTPError } from "../types/httpError";
import { IRequest } from "../types/request";
import { IResponse } from "../types/response";

export const getItemForEditing = async (req: IRequest<GetItemForEditingBody>, res: IResponse, itemTypeConfigs: ItemTypeConfigs) => {
    const itemTypeConfig = findItemConfigByName(itemTypeConfigs, req.body.typeName);

    if (!itemTypeConfig) {
        throw new HTTPError(400, "couldn't find typeConfig");
    }

    const item = await itemTypeConfig.getItemForEditing(req.body.id);

    if (!item) {
        throw new HTTPError(404, "couldn't find item");
    }

    res.json(item);
};
