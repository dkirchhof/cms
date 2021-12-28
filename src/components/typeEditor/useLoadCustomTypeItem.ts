import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemOfType } from "../../myDatabaseService";
import { MY_TYPES } from "../../myTypes";
import { ICustomTypeConfig } from "../../types/customType";

type State<T extends { id: string; }>
    = { state: "LOADING" } 
    | { state: "LOADED"; typeConfig: ICustomTypeConfig<T>; item: T; }
    | { state: "ERROR"; message: string; }

export const useLoadCustomTypeItem = () => {
    const { typePluralName, id } = useParams();

    const [state, setState] = useState<State<any>>({ state: "LOADING" });

    useEffect(() => {
        if (!typePluralName || !id) {
            setState({ state: "ERROR", message: "typeConfig or id param is missing" });
            return;
        }

        const typeConfig = MY_TYPES.find(type => type.pluralName === typePluralName);

        if (!typeConfig) {
            setState({ state: "ERROR", message: "couldn't find typeConfig" });
            return;
        }

        const item = getItemOfType(typePluralName, id);

        if (!item) {
            setState({ state: "ERROR", message: "couldn't find item" });
            return;
        }

        setState({ state: "LOADED", typeConfig, item });
    }, [typePluralName, id]);

    return state;
};
