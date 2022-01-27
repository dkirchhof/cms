import { useContext } from "react";
import { CMSContext } from "../contexts/cmsContext";

export const useCMS = () => useContext(CMSContext);
