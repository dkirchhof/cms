import { nanoid } from "nanoid"
import { IBlock, IBlockConfig } from "../../../../types/block"

export const createBlock = (blockConfig: IBlockConfig<any>) => {
    const block: IBlock = {
        id: nanoid(),
        blockName: blockConfig.name,
        data: Object.entries(blockConfig.propConfigs).reduce((prev, [key, config]) => ({
            ...prev,
            [key]: config.defaultValue,
        }), {}),
    };

    return block;
};
