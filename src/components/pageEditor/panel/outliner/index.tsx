import { IPage } from "../../../../types/page";
import { RootOutlinerItem } from "./outlinerItem";
import { Container } from "./styles";

interface IProps {
    page: IPage;

    selectionPath: string;
    setSelectionPath: (path: string) => void;
}

export const Outliner = (props: IProps) => {
    return (
        <Container>
            <RootOutlinerItem page={props.page} path="" selectionPath={props.selectionPath} setSelectionPath={props.setSelectionPath} />
        </Container>
    );
};
