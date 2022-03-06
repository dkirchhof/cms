import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IItemTypeConfigForList } from "../../../itemTypeBuilder";
import { IListItem } from "../../../itemTypeBuilder/listField";
import { findItemConfigByName } from "../../../utils/findItemTypeConfig";
import { getList } from "../../api";

type State<LIST_PROPS extends string>
    = { state: "LOADING" } 
    | { state: "LOADED"; itemTypeConfig: IItemTypeConfigForList<LIST_PROPS>; items: IListItem<LIST_PROPS>[]; }
    | { state: "ERROR"; message: string; }

export const useLoadEntities = <LIST_PROPS extends string>(itemTypeConfigs: IItemTypeConfigForList<LIST_PROPS>[]) => {
    const { typeName } = useParams();

    const [state, setState] = useState<State<LIST_PROPS>>({ state: "LOADING" });

    const fetch = async() => {
        try {
            setState({ state: "LOADING" });

            const itemTypeConfig = findItemConfigByName(itemTypeConfigs, typeName!);

            if (!itemTypeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            const items = await getList(itemTypeConfig);

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
