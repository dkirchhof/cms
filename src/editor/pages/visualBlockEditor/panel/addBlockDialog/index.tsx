import { PrimaryButton, SecondaryButton } from "../../../../components/button";
import { BlockConfigs } from "../../../../types/block";
import { Container, List } from "./styles";

export type SubmitFn = (blockName: string) => void;

interface IProps {
    close: () => void;
    submit: SubmitFn;
}

export const addBlockDialogFactory = (blockConfigs: BlockConfigs) => (props: IProps) => {
    return (
        <Container>
            <List>
                {blockConfigs.map((blockConfig, i) => 
                    <SecondaryButton key={i} onClick={() => props.submit(blockConfig.name)}>{blockConfig.name}</SecondaryButton>
                )}
            </List>

            <PrimaryButton onClick={props.close}>Abbrechen</PrimaryButton>
        </Container>
    );
};
