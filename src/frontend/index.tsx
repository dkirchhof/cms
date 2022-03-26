import { BlockConfigs, IBlock } from "../types/block";
import { renderChildren } from "../utils/renderChildren";

interface IProps {
    blockConfigs: BlockConfigs;
    blocks: IBlock[];
}

export const VisualBlockRenderer = (props: IProps) => {
    return (
        <>
            {renderChildren(props.blockConfigs, props.blocks)}
        </>
    );
};
