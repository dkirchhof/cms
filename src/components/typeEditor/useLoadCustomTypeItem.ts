import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MY_PAGES, MY_TYPES } from "../../myTypes";
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

        const item = MY_PAGES.find(page => page.id === id) as any;

        if (!item) {
            setState({ state: "ERROR", message: "couldn't find item" });
            return;
        }

        setState({ state: "LOADED", typeConfig, item });
    }, [typePluralName, id]);

    return state;
};

