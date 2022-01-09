import { BlockConfigs, IBlock } from "../types/block";
import { renderChildren } from "../utils/renderChildren";

interface IProps {
    blockConfigs: BlockConfigs;
    ctx: any;
    root: IBlock;
}

export const VisualBlockRenderer = (props: IProps) => {
    return (
        <>
            {renderChildren(props.blockConfigs, props.ctx, props.root.data.children!)}
        </>
    );
};
