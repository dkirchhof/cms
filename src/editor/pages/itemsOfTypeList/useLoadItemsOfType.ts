import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetItemType, IItemTypeConfig, ItemTypeConfigs } from "../../../shared/types/itemTypeConfig";
import { findItemConfigByName } from "../../../shared/utils/findItemTypeConfig";
import { getItems } from "../../api";

type State<T extends IItemTypeConfig>
    = { state: "LOADING" } 
    | { state: "LOADED"; itemTypeConfig: T; items: GetItemType<T>[]; }
    | { state: "ERROR"; message: string; }

export const useLoadItemsOfType = <T extends IItemTypeConfig>(itemTypeConfigs: ItemTypeConfigs) => {
    const { typeName } = useParams();

    const [state, setState] = useState<State<T>>({ state: "LOADING" });

    const fetch = async() => {
        try {
            const itemTypeConfig = findItemConfigByName(itemTypeConfigs, typeName!) as any;

            if (!itemTypeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            const items = await getItems(itemTypeConfig) as any;

            setState({ state: "LOADED", itemTypeConfig, items });
        } catch (e: any) {
            setState({ state: "ERROR", message: e.message });
        }
    };

    useEffect(() => {
        fetch();
    }, [typeName]);

    return state;
};
