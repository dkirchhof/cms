import { match } from "ts-pattern";
import { ItemTypeConfigs } from "../types/itemTypeConfig";
import { RequestBody } from "../types/requestData";
import { createItem } from "./apiFns/createItem";
import { deleteItem } from "./apiFns/deleteItem";
import { getEditableItem } from "./apiFns/getEditableItem";
import { getEntity } from "./apiFns/getEntity";
import { getEntities } from "./apiFns/getEntities";
import { updateItem } from "./apiFns/updateItem";
import { HTTPError } from "./types/httpError";

export const requestHandler = (itemTypeConfigs: ItemTypeConfigs) => async (req: any, res: any) => {
    try {
        if (req.method !== "POST") {
            throw new HTTPError(405, "only post is allowed");
        }

        const body: RequestBody = req.body;

        await match(body.method)
            .with("getEntity", () => getEntity(req, res, itemTypeConfigs))
            .with("getEntities", () => getEntities(req, res, itemTypeConfigs))
            .with("getEditableItem", () => getEditableItem(req, res, itemTypeConfigs))
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
