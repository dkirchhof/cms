import { IBlock } from "../../types/block";
import { renderChildren } from "../../utils/renderChildren";
import { Container } from "./styles";

interface IProps {
    content: IBlock[];
}

export const PagePreview = (props: IProps) => (
    <Container>
        {renderChildren(props.content)}
    </Container>
);
