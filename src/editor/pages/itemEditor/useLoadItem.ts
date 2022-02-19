import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IItem, IItemTypeConfig, ItemTypeConfigs } from "../../../types/itemTypeConfig";
import { findItemConfigByName } from "../../../utils/findItemTypeConfig";
import { getItem } from "../../api";

type State<EDITOR_ITEM_DATA>
    = { state: "LOADING" } 
    | { state: "LOADED"; itemTypeConfig: IItemTypeConfig<any, EDITOR_ITEM_DATA>; item: IItem<EDITOR_ITEM_DATA> | null; }
    | { state: "ERROR"; message: string; }

export const useLoadItem = <EDITOR_ITEM_DATA>(itemTypeConfigs: ItemTypeConfigs) => {
    const { typeName, id } = useParams();

    const [state, setState] = useState<State<EDITOR_ITEM_DATA>>({ state: "LOADING" });
    
    const fetch = async () => {
        try {
            setState({ state: "LOADING" });

            const itemTypeConfig = findItemConfigByName<any, EDITOR_ITEM_DATA>(itemTypeConfigs, typeName!);

            if (!itemTypeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            if(id === "new") {
                setState({ state: "LOADED", itemTypeConfig, item: null });
            } else {
               const item = await getItem(itemTypeConfig, id!);

               setState({ state: "LOADED", itemTypeConfig, item });
            }
        } catch (e: any) {
            setState({ state: "ERROR", message: e.message });
        }
    }

    useEffect(() => {
        fetch();
    }, [typeName, id]);

    return state;
};
