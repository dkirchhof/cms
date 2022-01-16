import update from "immer";
import { useState } from "react";
import { BlockConfigs, IBlock } from "../../../types/block";
import { GetItemType, IItemTypeConfig } from "../../../types/itemTypeConfig";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton, SecondaryButton } from "../../components/button";
import { BUTTON_RESET, BUTTON_UPDATE } from "../../messages";
import { KeyOfWithType } from "../../types/keyOfWithType";
import { deepCopy } from "../../utils/deepCopy";
import { traversePath } from "../../utils/path";
import { Header } from "../pageStyles";
import { panelFactory } from "./panel";
import { previewFactory } from "./preview";
import { Container } from "./styles";

export const loadedVisualEditorFactory = (blockConfigs: BlockConfigs) => {
    const Preview = previewFactory(blockConfigs);
    const Panel = panelFactory(blockConfigs);

    return (props: { root: IBlock }) => {
        const [value, setValue] = useState<IBlock>(deepCopy(props.root));

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
                <Preview ctx={{ }} root={value} />
                <Panel root={value} changeData={changeData} addBlock={addBlock} removeBlock={removeBlock} />
            </Container>
        );
    };
};
