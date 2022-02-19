import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IItem, IItemTypeConfig, ItemTypeConfigs } from "../../../types/itemTypeConfig";
import { findItemConfigByName } from "../../../utils/findItemTypeConfig";
import { getEntities } from "../../api";

type State<LIST_ITEM_DATA>
    = { state: "LOADING" } 
    | { state: "LOADED"; itemTypeConfig: IItemTypeConfig<LIST_ITEM_DATA, any>; items: IItem<LIST_ITEM_DATA>[]; }
    | { state: "ERROR"; message: string; }

export const useLoadEntities = <LIST_ITEM_DATA>(itemTypeConfigs: ItemTypeConfigs) => {
    const { typeName } = useParams();

    const [state, setState] = useState<State<LIST_ITEM_DATA>>({ state: "LOADING" });

    const fetch = async() => {
        try {
            setState({ state: "LOADING" });

            const itemTypeConfig = findItemConfigByName<LIST_ITEM_DATA, any>(itemTypeConfigs, typeName!);

            if (!itemTypeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            const items = await getEntities(itemTypeConfig);

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
