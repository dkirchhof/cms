import { BlockConfigs, IBlock } from "../../../types/block";
import { renderChildren } from "../../../utils/renderChildren";
import { Container } from "./styles";

interface IProps {
    root: IBlock;
}

export const previewFactory = (blockConfigs: BlockConfigs) => (props: IProps) => (
    <Container>
        {renderChildren(blockConfigs, props.root.data.children!)}
    </Container>
);
