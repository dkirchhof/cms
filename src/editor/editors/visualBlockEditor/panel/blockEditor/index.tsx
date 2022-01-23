import { BlockConfigs, IBlock } from "../../../../../types/block";
import { findBlockConfigByName } from "../../../../../utils/findBlockConfig";
import { PrimaryButton, SecondaryButton } from "../../../../components/button";
import { ADD_BLOCK, REMOVE_BLOCK } from "../../../../messages";
import { Name, Container, Label } from "../editorStyles";

interface IProps {
    block: IBlock;
    isRoot: boolean;

    onChange: (prop: string) => (value: any) => void;
    addBlock: () => void;
    removeBlock: () => void;
}

export const blockEditorFactory = (blockConfigs: BlockConfigs) => (props: IProps) => {
    const blockConfig = findBlockConfigByName(blockConfigs, props.block.blockName);

    if (!blockConfig) {
        throw new Error("couldn't find blockConfig");
    }

    const inputs = blockConfig.getEditorInputs();

    return (
        <Container>
            <Name>{props.block.blockName}</Name>

            {Object.entries(inputs).map(([prop, Input]) => (
                <Label key={prop}>
                    {prop}
                    <Input value={props.block.data[prop]} onChange={props.onChange(prop)} />
                </Label>
            ))}

            {props.block.data.children && <PrimaryButton onClick={props.addBlock}>{ADD_BLOCK}</PrimaryButton>}
            {!props.isRoot && <SecondaryButton onClick={props.removeBlock}>{REMOVE_BLOCK}</SecondaryButton>}
        </Container>
    );
};
