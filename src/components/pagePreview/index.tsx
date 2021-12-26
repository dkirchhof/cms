import { IPage } from "../../types/page";
import { renderChildren } from "../../utils/renderChildren";
import { Container } from "./styles";

interface IProps {
    page: IPage;
}

export const PagePreview = (props: IProps) => (
    <Container>
        {renderChildren(props.page.content)}
    </Container>
);
