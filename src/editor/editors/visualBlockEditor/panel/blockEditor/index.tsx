import { BlockConfigs, IBlock } from "../../../../../types/block";
import { findBlockConfigByName } from "../../../../../utils/findBlockConfig";
import { useCMS } from "../../hooks/useCMS";
import { Name, Container, Label } from "../editorStyles";

interface IProps {
    block: IBlock;

    onChange: (prop: string) => (value: any) => void;
}

export const BlockEditor = (props: IProps) => {
    const cms = useCMS();

    const blockConfig = findBlockConfigByName(cms.blockConfigs, props.block.blockName);

    if (!blockConfig) {
        throw new Error("couldn't find blockConfig");
    }

    return (
        <Container>
            <Name>{props.block.blockName}</Name>

            {Object.entries(blockConfig.propConfigs).map(([prop, config]) => {
                if (!config.editor) {
                    return null;
                }

                return (
                    <Label key={prop}>
                        {prop}
                        <config.editor value={props.block.data[prop]} onChange={props.onChange(prop)} />
                    </Label>
                );
            })}
        </Container>
    );
};
