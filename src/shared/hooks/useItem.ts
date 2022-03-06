import { useContext } from "react";
import { match } from "ts-pattern";
import { ItemContext } from "../contexts/itemContext";

// const createEditorFieldsProxy = (target: IEditorField<any, any>[]) => {
    // const handler = {
    //     get: function(target: IEditorField<any, any>[], prop: string) {
    //         return target.find(field => field.prop === prop)?.currentValue;
    //     }
    // };
// };

const createEditorFieldsProxy = (target: any) => {
    const handler = {
        get: function(target: any, prop: string) {
            return target.find((field: any) => field.prop === prop)?.currentValue;
        }
    };

    return new Proxy(target, handler) as any;
};

export const useItem = <T>(): T => {
    const value = useContext(ItemContext);

    return match(value)
        .with({ type: "ITEM" }, value => value.item)
        .with({ type: "EDITOR_FIELDS" }, value => createEditorFieldsProxy(value.editorFields))
        .exhaustive();
};
