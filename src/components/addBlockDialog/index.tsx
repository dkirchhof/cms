import { BlocksMap } from "../..";
import { IBlockConfig } from "../../types/block";
import { PrimaryButton, SecondaryButton } from "../button";
import { Container, List } from "./styles";

interface IProps {
    availableBlocks: BlocksMap;

    close: () => void;
    submit: (blockName: string, blockConfig: IBlockConfig<any>) => void;
}

export const AddBlockDialog = (props: IProps) => {
    
    return (
        <Container>
            <List>
                {Object.entries(props.availableBlocks).map(([blockName, blockConfig], i) => 
                    <SecondaryButton key={i} onClick={() => props.submit(blockName, blockConfig)}>{blockName}</SecondaryButton>
                )}
            </List>

            <PrimaryButton onClick={props.close}>Abbrechen</PrimaryButton>
        </Container>
    );
};
