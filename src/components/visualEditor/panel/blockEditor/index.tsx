import { ADD_BLOCK, REMOVE_BLOCK } from "../../../../messages";
import { IBlock } from "../../../../types/block";
import { PrimaryButton, SecondaryButton } from "../../../button";
import { BLOCKS } from "../../../visualEditor";
import { Name, Container, Label } from "../editorStyles";

interface IProps {
    block: IBlock;
    isRoot: boolean;

    onChange: (prop: string) => (value: any) => void;
    addBlock: () => void;
    removeBlock: () => void;
}

export const BlockEditor = (props: IProps) => {
    const blockConfig = BLOCKS[props.block.blockName];
    const inputs = blockConfig.getEditorInputs();

    return (
        <Container>
            <Name>{props.block.blockName}</Name>

            {Object.entries(inputs).map(([prop, Input]) => (
                <Label key={prop}>
                    {prop}
                    <Input prop={prop} value={props.block.data[prop]} onChange={props.onChange(prop)} />
                </Label>
            ))}

            {props.block.data.children && <PrimaryButton onClick={props.addBlock}>{ADD_BLOCK}</PrimaryButton>}
            {!props.isRoot && <SecondaryButton onClick={props.removeBlock}>{REMOVE_BLOCK}</SecondaryButton>}
        </Container>
    );
};
