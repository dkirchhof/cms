import { PrimaryButton, SecondaryButton } from "../../../../components/button";
import { BLOCKS } from "../../../visualEditor";
import { Container, List } from "./styles";

export type SubmitFn = (blockName: string) => void;

interface IProps {
    close: () => void;
    submit: SubmitFn;
}

export const AddBlockDialog = (props: IProps) => {
    return (
        <Container>
            <List>
                {Object.keys(BLOCKS).map((blockName, i) => 
                    <SecondaryButton key={i} onClick={() => props.submit(blockName)}>{blockName}</SecondaryButton>
                )}
            </List>

            <PrimaryButton onClick={props.close}>Abbrechen</PrimaryButton>
        </Container>
    );
};