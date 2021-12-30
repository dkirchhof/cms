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
        try {
            if (!typePluralName || !id) {
                throw new Error("typeConfig or id param is missing");
            }

            const typeConfig = MY_TYPES.find(type => type.pluralName === typePluralName);

            if (!typeConfig) {
                throw new Error("couldn't find typeConfig");
            }

            const item = getItemOfType(typePluralName, id);

            if (!item) {
                throw new Error("couldn't find item");
            }

            setState({ state: "LOADED", typeConfig, item });
        } catch (e: any) {
            setState({ state: "ERROR", message: e.message });
        }
    }, [typePluralName, id]);

    return state;
};
