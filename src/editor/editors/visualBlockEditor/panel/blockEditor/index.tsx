import { BlockConfigs, IBlock } from "../../../../../types/block";
import { findBlockConfigByName } from "../../../../../utils/findBlockConfig";
import { Name, Container, Label } from "../editorStyles";

interface IProps {
    block: IBlock;
    isRoot: boolean;

    onChange: (prop: string) => (value: any) => void;

    blockConfigs: BlockConfigs;
}

export const BlockEditor = (props: IProps) => {
    const blockConfig = findBlockConfigByName(props.blockConfigs, props.block.blockName);

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
        </Container>
    );
};
