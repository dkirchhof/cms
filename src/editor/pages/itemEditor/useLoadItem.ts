import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FullType, IItemTypeConfig, ItemTypeConfigs } from "../../../shared/types/itemTypeConfig";
import { findItemConfigByName } from "../../../shared/utils/findItemTypeConfig";
import { getItem } from "../../api";

type State<T extends IItemTypeConfig>
    = { state: "LOADING" } 
    | { state: "LOADED"; itemTypeConfig: T; item: FullType<T>; }
    | { state: "ERROR"; message: string; }

export const useLoadItem = <T extends IItemTypeConfig>(itemTypeConfigs: ItemTypeConfigs) => {
    const { typeName, id } = useParams();

    const [state, setState] = useState<State<T>>({ state: "LOADING" });
    
    const fetch = async () => {
        try {
            const itemTypeConfig = findItemConfigByName(itemTypeConfigs, typeName!) as any;

            if (!itemTypeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            const item = await getItem(itemTypeConfig, id!);

            if (!item) {
                throw new Error("couldn't find item");
            }

            setState({ state: "LOADED", itemTypeConfig, item });
        } catch (e: any) {
            setState({ state: "ERROR", message: e.message });
        }
    }

    useEffect(() => {
        fetch();
    }, [typeName, id]);

    return state;
};
