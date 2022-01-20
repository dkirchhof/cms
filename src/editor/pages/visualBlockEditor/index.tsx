import update from "immer";
import { useState } from "react";
import { BlockConfigs, IBlock } from "../../../types/block";
import { deepCopy } from "../../utils/deepCopy";
import { traversePath } from "../../utils/path";
import { panelFactory } from "./panel";
import { Preview } from "./preview";
import { Container } from "./styles";

export const VisualBlockEditor = (props: { blockConfigs: BlockConfigs, root: IBlock }) => {
    const [value, setValue] = useState<IBlock>(deepCopy(props.root));

    const Panel = panelFactory(props.blockConfigs);

    const changeData = (path: string) => (prop: string) => (dataValue: any) => {
        setValue(
            update(value => {
                traversePath(value, path).data[prop] = dataValue;
            }, value)
        );
    };

    const addBlock = (path: string) => (block: IBlock) => {
        setValue(
            update(value => {
                traversePath(value, path).data.children!.push(block);
            }, value)
        );
    };

    const removeBlock = (parentPath: string, index: number) => {
        setValue(
            update(value => {
                traversePath(value, parentPath).data.children!.splice(index, 1);
            }, value)
        );
    };

    return (
        <Container>
            <Preview blockConfigs={props.blockConfigs} ctx={{}} root={value} />
            <Panel root={value} changeData={changeData} addBlock={addBlock} removeBlock={removeBlock} />
        </Container>
    );
};
