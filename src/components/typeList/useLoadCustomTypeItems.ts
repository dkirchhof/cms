import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemsOfType } from "../../myDatabaseService";
import { MY_TYPES } from "../../myTypes";
import { ICustomTypeConfig } from "../../types/customType";

type State<T extends { id: string; }>
    = { state: "LOADING" } 
    | { state: "LOADED"; typeConfig: ICustomTypeConfig<T>; items: T[]; }
    | { state: "ERROR"; message: string; }

export const useLoadCustomTypeItems = () => {
    const { typePluralName } = useParams();

    const [state, setState] = useState<State<any>>({ state: "LOADING" });

    useEffect(() => {
        try {
            if (!typePluralName) {
                throw new Error("typeConfig param is missing");
            }

            const typeConfig = MY_TYPES.find(type => type.pluralName === typePluralName);

            if (!typeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            const items = getItemsOfType(typePluralName);

            setState({ state: "LOADED", typeConfig, items });
        } catch (e: any) {
            setState({ state: "ERROR", message: e.message });
        }
    }, [typePluralName]);

    return state;
};
