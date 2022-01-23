import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IItem, IItemTypeConfig, ItemTypeConfigs } from "../../../types/itemTypeConfig";
import { findItemConfigByName } from "../../../utils/findItemTypeConfig";
import { getEditableItem } from "../../api";

type State<EDITABLE_ITEM extends IItem>
    = { state: "LOADING" } 
    | { state: "LOADED"; itemTypeConfig: IItemTypeConfig<any, EDITABLE_ITEM>; item: EDITABLE_ITEM | null; }
    | { state: "ERROR"; message: string; }

export const useLoadItem = <EDITABLE_ITEM extends IItem>(itemTypeConfigs: ItemTypeConfigs) => {
    const { typeName, id } = useParams();

    const [state, setState] = useState<State<EDITABLE_ITEM>>({ state: "LOADING" });
    
    const fetch = async () => {
        try {
            setState({ state: "LOADING" });

            const itemTypeConfig = findItemConfigByName<any, EDITABLE_ITEM>(itemTypeConfigs, typeName!);

            if (!itemTypeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            if(id === "new") {
                setState({ state: "LOADED", itemTypeConfig, item: null });
            } else {
               const item = await getEditableItem(itemTypeConfig, id!);

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
