import { IItemType } from "../../itemTypeBuilder";
import { IRequestBody } from "../../types/requestData";

const getResponseContent = async (response: Response) => {
    const contentType = response.headers.get("Content-Type");

    if (contentType?.startsWith("application/json")) {
        return response.json();
    }

    return response.text();
};

const request = async <T>(body: IRequestBody) => {
    const response = await fetch("/api/cms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const responseBody = await getResponseContent(response);

    if (response.ok) {
        return responseBody as T;
    } else {
        throw new Error(responseBody);
    }
};

export const createApi = <ITEM_TYPE extends IItemType>(itemType: ITEM_TYPE) => {
    const handler = {
        get(_: any, fn: keyof IItemType["api"]) {
            return function(...params: any[]) {
                // console.log(itemType.name[0], fn, params);

                return request({ fn, itemType: itemType.name[0], params });
            };
        },
    };

    return new Proxy(itemType.api, handler) as ITEM_TYPE["api"];
};
