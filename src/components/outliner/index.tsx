import { IBlock } from "../../types/block";
import { PrimaryButton } from "../button";
import { OutlinerItem } from "./outlinerItem";
import { Container } from "./styles";

interface IProps {
    content: IBlock[];
    currentSelectionPath: string;

    addNewBlock: (path: string) => void;
    selectBlock: (path: string) => void;
}

export const Outliner = ({ content, ...props }: IProps) => {
    return (
        <Container>
            {content.map((block, i) => <OutlinerItem key={i} path={i.toString()} block={block} {...props} />)}

            <PrimaryButton onClick={() => props.addNewBlock("")}>+</PrimaryButton>
        </Container>
    );
};
