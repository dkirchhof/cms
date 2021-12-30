import { IBlock } from "../../../types/block";
import { renderChildren } from "../../../utils/renderChildren";
import { Container } from "./styles";

interface IProps {
    root: IBlock;
}

export const Preview = (props: IProps) => (
    <Container>
        {renderChildren(props.root.data.children!)}
    </Container>
);
