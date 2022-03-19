import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IItemTypeConfigForList } from "../../../itemTypeBuilder";
import { findItemConfigByName } from "../../../utils/findItemTypeConfig";

type State
    = { state: "LOADING" }
    | { state: "LOADED"; itemTypeConfig: IItemTypeConfigForList<any>; }
    | { state: "ERROR"; message: string; }

export const useLoadItemTypeConfig = (itemTypeConfigs: IItemTypeConfigForList<any>[]) => {
    const { typeName } = useParams();

    const [state, setState] = useState<State>({ state: "LOADING" });

    useEffect(() => {
        const itemTypeConfig = findItemConfigByName(itemTypeConfigs, typeName!);

        if (!itemTypeConfig) {
            setState({ state: "ERROR", message: "couldn't find typeConfig" });
        } else {
            setState({ state: "LOADED", itemTypeConfig });
        }
    }, [typeName]);

    return state;
};
