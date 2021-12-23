import { BLOCKS } from "../..";
import { IBlock } from "../../types/block";
import { BlockName, Container, Label } from "./styles";

interface IProps {
    block: IBlock | null;

    onChange: (prop: string) => (value: any) => void;
}

export const Inspector = (props: IProps) => {
    if (!props.block) {
        return <Container />;
    }
    
    const block = props.block;
    const blockConfig = BLOCKS[block.blockName];
    const inputs = blockConfig.getEditorInputs();

    return (
        <Container>
            <BlockName>{props.block.blockName}</BlockName>

            {Object.entries(inputs).map(([prop, Input]) => {
                if (!Input) {
                    return Input;
                }

                return (
                    <Label key={prop}>
                        {prop}
                        <Input value={block.data[prop]} onChange={props.onChange(prop)} />
                    </Label>
                );
            })}
        </Container>
    );
};
