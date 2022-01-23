import { BlockConfigs } from "../../../../../types/block";
import { PrimaryButton, SecondaryButton } from "../../../../components/button";
import { Container, List } from "./styles";

export type SubmitFn = (blockName: string) => void;

interface IProps {
    close: () => void;
    submit: SubmitFn;

    blockConfigs: BlockConfigs;
}

export const AddBlockDialog = (props: IProps) => {
    return (
        <Container>
            <List>
                {props.blockConfigs.map((blockConfig, i) => 
                    <SecondaryButton key={i} onClick={() => props.submit(blockConfig.name)}>{blockConfig.name}</SecondaryButton>
                )}
            </List>

            <PrimaryButton onClick={props.close}>Abbrechen</PrimaryButton>
        </Container>
    );
};
