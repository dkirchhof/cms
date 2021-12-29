import { IBlock } from "../../../../types/block";
import { OutlinerItem } from "./outlinerItem";
import { Container } from "./styles";

interface IProps {
    root: IBlock;

    selectionPath: string;
    setSelectionPath: (path: string) => void;
}

export const Outliner = (props: IProps) => {
    return (
        <Container>
            <OutlinerItem block={props.root} path="" selectionPath={props.selectionPath} setSelectionPath={props.setSelectionPath} />
        </Container>
    );
};
