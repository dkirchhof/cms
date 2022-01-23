import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IItem, IItemTypeConfig, ItemTypeConfigs } from "../../../types/itemTypeConfig";
import { findItemConfigByName } from "../../../utils/findItemTypeConfig";
import { getEntities } from "../../api";

type State<ENTITY extends IItem>
    = { state: "LOADING" } 
    | { state: "LOADED"; itemTypeConfig: IItemTypeConfig<ENTITY, any>; items: ENTITY[]; }
    | { state: "ERROR"; message: string; }

export const useLoadEntities = <ENTITY extends IItem>(itemTypeConfigs: ItemTypeConfigs) => {
    const { typeName } = useParams();

    const [state, setState] = useState<State<ENTITY>>({ state: "LOADING" });

    const fetch = async() => {
        try {
            setState({ state: "LOADING" });

            const itemTypeConfig = findItemConfigByName<ENTITY, any>(itemTypeConfigs, typeName!);

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
