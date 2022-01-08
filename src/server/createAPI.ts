import { match } from "ts-pattern";
import { RequestBody } from "../shared/types/requestData";
import { createItem } from "./apiFns/createItem";
import { deleteItem } from "./apiFns/deleteItem";
import { getItem } from "./apiFns/getItem";
import { getItems } from "./apiFns/getItems";
import { updateItem } from "./apiFns/updateItem";
import { HTTPError } from "./types/httpError";
import { ItemTypeAPIConfigs } from "./types/itemType";

export const requestHandler = (itemTypeConfigs: ItemTypeAPIConfigs) => async (req: any, res: any) => {
    try {
        if (req.method !== "POST") {
            throw new HTTPError(405, "only post is allowed");
        }

        const body: RequestBody = req.body;

        await match(body.method)
            .with("getItem", () => getItem(req, res, itemTypeConfigs))
            .with("getItems", () => getItems(req, res, itemTypeConfigs))
            .with("createItem", () => createItem(req, res, itemTypeConfigs))
            .with("updateItem", () => updateItem(req, res, itemTypeConfigs))
            .with("deleteItem", () => deleteItem(req, res, itemTypeConfigs))
            .exhaustive();
    } catch (e) {
        if (e instanceof HTTPError) {
            res.status(e.code).send(e.message);
        } else if (e instanceof Error) {
            res.status(500).send(e.message);
        }
    }
}
