import { useContext as nativeUseContext } from "react";
import { Context } from "..";

export const useContext = () => nativeUseContext(Context);
