import { IDeserializedBlock } from "../../types/block";
import { Container } from "./styles";

interface IProps {
    content: IDeserializedBlock[];
}

export const PagePreview = (props: IProps) => (
    <Container>
        {props.content.map((block, i) => <block.Component key={i} data={block.data} />)}
    </Container>
);
