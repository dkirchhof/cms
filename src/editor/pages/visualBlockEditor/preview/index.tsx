import { BlockConfigs, IBlock } from "../../../../types/block";
import { renderChildren } from "../../../../utils/renderChildren";
import { Container } from "./styles";

interface IProps {
    ctx: any;
    root: IBlock;
}

export const previewFactory = (blockConfigs: BlockConfigs) => (props: IProps) => (
    <Container>
        {renderChildren(blockConfigs, props.ctx, props.root.data.children!)}
    </Container>
);
