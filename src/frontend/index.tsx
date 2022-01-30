import { BlockConfigs, IBlock } from "../types/block";
import { renderChildren } from "../utils/renderChildren";

interface IProps {
    blockConfigs: BlockConfigs;
    root: IBlock;
}

export const VisualBlockRenderer = (props: IProps) => {
    return (
        <>
            {renderChildren(props.blockConfigs, props.root.data.children!)}
        </>
    );
};
