import { match } from "ts-pattern";
import { IItemType } from "../itemTypeBuilder";
import { IRequestBody } from "../types/requestData";
import { findItemConfigByName } from "../utils/findItemTypeConfig";
import { HTTPError } from "./types/httpError";
import { IRequest } from "./types/request";
import { IResponse } from "./types/response";

export const requestHandlerFactory = (itemTypeConfigs: IItemType[]) => async (req: IRequest<IRequestBody>, res: IResponse) => {
    try {
        if (req.method !== "POST") {
            throw new HTTPError(405, "only post is allowed");
        }

        const itemType = findItemConfigByName(itemTypeConfigs, req.body.itemType);

        if (!itemType) {
            throw new HTTPError(400, "couldn't find typeConfig");
        }

        const result = await (itemType.api[req.body.fn] as any)(...req.body.params);
        
        match(typeof result)
            .with("object", () => res.json(result))
            .with("string", () => res.send(result))
            .otherwise(() => res.end());

    } catch (e) {
        if (e instanceof HTTPError) {
            res.status(e.code).send(e.message);
        } else if (e instanceof Error) {
            res.status(500).send(e.message);
        }
    }
}
