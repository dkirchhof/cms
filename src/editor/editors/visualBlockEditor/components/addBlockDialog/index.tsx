import { IBlockConfig } from "../../../../../types/block";
import { PrimaryButton, SecondaryButton } from "../../../../components/button";
import { useCMS } from "../../hooks/useCMS";
import { useEscToClose } from "../../hooks/useEscToClose";
import { Backdrop, Container, List } from "./styles";

interface IProps {
    close: () => void;
    submit: (blockConfig: IBlockConfig<any, any>) => void;
}

export const AddBlockDialog = (props: IProps) => {
    const cms = useCMS();

    useEscToClose(props.close);

    return (
        <Backdrop onClick={props.close}>
            <Container onClick={e => e.stopPropagation()}>
                <List>
                    {cms.blockConfigs.map((blockConfig, i) => 
                        <SecondaryButton key={i} onClick={() => props.submit(blockConfig)}>{blockConfig.name}</SecondaryButton>
                    )}
                </List>

                <PrimaryButton onClick={props.close}>Abbrechen</PrimaryButton>
            </Container>
        </Backdrop>
    );
};
