import { BlockConfigs, IBlock } from "../../../../types/block";
import { renderChildren } from "../../../../utils/renderChildren";
import { Container } from "./styles";

interface IProps {
    ctx: any;
    blocks: IBlock[];
    blockConfigs: BlockConfigs;
}

export const Preview = (props: IProps) => (
    <Container>
        {renderChildren(props.blockConfigs, props.ctx, props.blocks)}
    </Container>
);
