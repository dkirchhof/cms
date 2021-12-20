import { IDeserializedBlock } from "../../types/block";
import { BlockName, Container, Label } from "./styles";

interface IProps {
    block: IDeserializedBlock | null;

    onChange: (prop: string) => (value: any) => void;
}

export const Inspector = (props: IProps) => {
    if (!props.block) {
        return <Container />;
    }
    
    const block = props.block;
    const inputs = block.getEditorInputs();

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
