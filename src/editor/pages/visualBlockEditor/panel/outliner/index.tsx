import { BlockConfigs, IBlock } from "../../../../types/block";
import { OutlinerItem } from "./outlinerItem";
import { Container } from "./styles";

interface IProps {
    root: IBlock;

    selectionPath: string;
    setSelectionPath: (path: string) => void;
}

export const outlinerFactory = (blockConfigs: BlockConfigs) => {
    return (props: IProps) => {
        return (
            <Container>
                <OutlinerItem block={props.root} blockConfigs={blockConfigs} path="" selectionPath={props.selectionPath} setSelectionPath={props.setSelectionPath} />
            </Container>
        );
    };
};
