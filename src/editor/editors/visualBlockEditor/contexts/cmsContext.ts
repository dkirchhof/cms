import { createContext } from "react";
import { BlockConfigs, IBlockConfig } from "../../../../types/block";
import { Selection } from "../types";

export interface ICMSContext {
    selection: Selection;
    setSelection: (selection: Selection) => void;
    
    blockConfigs: BlockConfigs;
    addBlock: (blockConfig: IBlockConfig<any>, parentPath: string | null, index: number) => void;
    removeBlock: (path: string) => void;
}

export const CMSContext = createContext<ICMSContext>(null as any);
