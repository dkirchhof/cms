import { BlockConfigs } from "../types/block";

export const findBlockConfigByName = (blockConfigs: BlockConfigs, name: string) => {
    return blockConfigs.find(config => config.name === name);
};
