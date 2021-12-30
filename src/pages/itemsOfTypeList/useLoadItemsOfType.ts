import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemsOfType } from "../../myDatabaseService";
import { MY_TYPES } from "../../myTypes";
import { ICustomTypeConfig } from "../../types/customType";

type State<T extends { id: string; }>
    = { state: "LOADING" } 
    | { state: "LOADED"; typeName: string; typeConfig: ICustomTypeConfig<T>; items: T[]; }
    | { state: "ERROR"; message: string; }

export const useLoadItemsOfType = () => {
    const { typeName } = useParams();

    const [state, setState] = useState<State<any>>({ state: "LOADING" });

    useEffect(() => {
        try {
            if (!typeName) {
                throw new Error("typeConfig param is missing");
            }

            const typeConfig = MY_TYPES[typeName];

            if (!typeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            const items = getItemsOfType(typeName);

            setState({ state: "LOADED", typeName, typeConfig, items });
        } catch (e: any) {
            setState({ state: "ERROR", message: e.message });
        }
    }, [typeName]);

    return state;
};
