import { createContext, useContext } from "react";
import { BlockConfigs, IBlock } from "../types/block";
import { renderChildren } from "../utils/renderChildren";

interface IProps {
    blockConfigs: BlockConfigs;
    item: any;
    root: IBlock;
}

export const ItemContext = createContext<any>(null);
export const useItem = <T extends any>() => useContext<T>(ItemContext);

export const VisualBlockRenderer = (props: IProps) => {
    return (
        <ItemContext.Provider value={props.item}>
            {renderChildren(props.blockConfigs, props.root.data.children!)}
        </ItemContext.Provider>
    );
};
