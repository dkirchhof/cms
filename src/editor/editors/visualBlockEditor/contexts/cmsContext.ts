import { createContext } from "react";
import { BlockConfigs } from "../../../../types/block";
import { Selection } from "../types";

export interface ICMSContext {
    selection: Selection;
    setSelection: (selection: Selection) => void;
    
    blockConfigs: BlockConfigs;
    removeBlock: (path: string) => void;
}

export const CMSContext = createContext<ICMSContext>(null as any);
