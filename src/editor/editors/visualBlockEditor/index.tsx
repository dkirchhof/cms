import update from "immer";
import { useState } from "react";
import { BlockConfigs, IBlock, IBlockConfig } from "../../../types/block";
import { IPropEditorProps } from "../../types/propEditor";
import { getParentPathAndIndex, getPath, getPathForChild, traversePath } from "../../utils/path";
import { BlockEditor } from "./components/blockEditor";
import { Outliner } from "./components/outliner";
import { Preview } from "./components/preview";
import { CMSContext } from "./contexts/cmsContext";
import { Container } from "./styles";
import { Selection } from "./types";
import { createBlock } from "./utils/createBlock";

interface IOptions {
    blockConfigs: BlockConfigs;
}

export const visualBlockEditorFactory = (options: IOptions) => (props: IPropEditorProps<IBlock[]>) => {
    const [selection, setSelection] = useState<Selection>(null);
    const selectedBlock = selection && traversePath(props.value, selection);

    const changeData = (path: string) => (prop: string) => (dataValue: any) => {
        if (path === "") {
            return;
        }

        const newValue = update(value => {
            traversePath(value, path).data[prop] = dataValue;
        }, props.value)();

        props.onChange(newValue);
    };

    const addBlock = (blockConfig: IBlockConfig<any, any>, parentPath: string | null, index: number) => {
        const block = createBlock(blockConfig);

        const newValue = update(props.value, value => {
            if (parentPath) {
                traversePath(value, parentPath).data.children!.splice(index, 0, block);
            } else {
                value.splice(index, 0, block);
            }
        });

        props.onChange(newValue);

        setSelection(getPathForChild(parentPath, index));
    };

    const removeBlock = (path: string) => {
        const selectedBlock = selection && traversePath(props.value, selection);

        const { parentPath, index } = getParentPathAndIndex(path);
        
        const newValue = update(props.value, value => {
            if (parentPath) {
                traversePath(value, parentPath).data.children!.splice(index, 1);
            } else {
                value.splice(index, 1);
            }
        });

        props.onChange(newValue);

        if (selectedBlock) {
            setSelection(getPath(newValue, selectedBlock.id));
        }
    };

    return (
        <CMSContext.Provider value={{ selection, setSelection, blockConfigs: options.blockConfigs, addBlock, removeBlock }}>
            <Container>
                <Preview blocks={props.value} ctx={{}} />
                <Outliner blocks={props.value} />
                {selectedBlock && <BlockEditor block={selectedBlock} onChange={changeData(selection)} />}
            </Container>
        </CMSContext.Provider>
    );
};
