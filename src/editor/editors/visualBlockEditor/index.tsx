import update from "immer";
import { useState } from "react";
import { BlockConfigs, IBlock } from "../../../types/block";
import { IPropEditorProps } from "../../types/propEditor";
import { getIndex, getParentPathAndIndex, getPath, getPathForParent, traversePath } from "../../utils/path";
import { CMSContext } from "./contexts/cmsContext";
import { Panel } from "./panel";
import { Preview } from "./preview";
import { Container } from "./styles";
import { Selection } from "./types";

interface IOptions {
    blockConfigs: BlockConfigs;
}


export const visualBlockEditorFactory = (options: IOptions) => (props: IPropEditorProps<IBlock[]>) => {
    const [selection, setSelection] = useState<Selection>(null);

    const changeData = (path: string) => (prop: string) => (dataValue: any) => {
        if (path === "") {
            return;
        }

        const newValue = update(value => {
            traversePath(value, path).data[prop] = dataValue;
        }, props.value)();

        props.onChange(newValue);
    };

    const addBlock = (path: string) => (block: IBlock) => {
        // setValue(
        //     update(value => {
        //         traversePath(value, path).data.children!.push(block);
        //     }, value)
        // );
    };

    const removeBlock = (path: string) => {
        const { parentPath, index } = getParentPathAndIndex(path);

        const newValue = update(props.value, value => {
            if (parentPath) {
                traversePath(value, parentPath).data.children!.splice(index, 1);
            } else {
                value.splice(index, 1);
            }
        });

        props.onChange(newValue);

        if (selection) {
            const newPath = getPath(newValue, selection.id);

            if (newPath) {
                setSelection({ id: selection.id, path: newPath });
            } else {
                setSelection(null);
            }
        }
    };

    return (
        <CMSContext.Provider value={{ selection, setSelection, blockConfigs: options.blockConfigs, removeBlock }}>
            <Container>
                <Preview
                    blockConfigs={options.blockConfigs}
                    blocks={props.value}
                    ctx={{}}
                />

                <Panel
                    blocks={props.value}
                    changeData={changeData}
                    addBlock={addBlock}
                />
            </Container>
        </CMSContext.Provider>
    );
};
