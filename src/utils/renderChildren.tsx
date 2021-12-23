import { BLOCKS } from "../components/pageEditor";
import { IBlock } from "../types/block";

export const renderChildren = (children: IBlock[]) => {
    return children.map((block, i) => {
        const blockConfig = BLOCKS[block.blockName];

        return <blockConfig.Component key={i} data={block.data} />;
    });
};
