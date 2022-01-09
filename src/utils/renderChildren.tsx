import { BlockConfigs, IBlock } from "../types/block";
import { findBlockConfigByName } from "../utils/findBlockConfig";

export const renderChildren = (blockConfigs: BlockConfigs, ctx: any, children: IBlock[]) => {
    return children.map((block, i) => {
        const blockConfig = findBlockConfigByName(blockConfigs, block.blockName);

        if (!blockConfig) {
            throw new Error("couldn't find blockConfig");
        }

        return <blockConfig.Component key={i} blockConfigs={blockConfigs} ctx={ctx} data={block.data} />;
    });
};
