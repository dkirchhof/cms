import { ItemTypeConfigs } from "../../types/itemTypeConfig";
import { GetEntitiesBody } from "../../types/requestData";
import { findItemConfigByName } from "../../utils/findItemTypeConfig";
import { HTTPError } from "../types/httpError";
import { IRequest } from "../types/request";
import { IResponse } from "../types/response";

export const getEntities = async (req: IRequest<GetEntitiesBody>, res: IResponse, itemTypeConfigs: ItemTypeConfigs) => {
    const itemTypeConfig = findItemConfigByName(itemTypeConfigs, req.body.typeName);

    if (!itemTypeConfig) {
        throw new HTTPError(400, "couldn't find typeConfig");
    }

    const items = await itemTypeConfig.backend.api.getEntities();

    res.json(items);
};
