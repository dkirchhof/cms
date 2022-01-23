import { useState } from "react";
import { BlockConfigs, IBlock } from "../../../../types/block";
import { findBlockConfigByName } from "../../../../utils/findBlockConfig";
import { getIndex, getPathForChild, getPathForParent, traversePath } from "../../../utils/path";
import { AddBlockDialog, SubmitFn as AddBlockDialogSubmitFn } from "./addBlockDialog";
import { BlockEditor } from "./blockEditor";
import { Outliner } from "./outliner";
import { Container } from "./styles";

interface IProps {
    root: IBlock;

    changeData: (path: string) => (prop: string) => (value: any) => void;

    blockConfigs: BlockConfigs;
    addBlock: (path: string) => (block: IBlock) => void;
    removeBlock: (parentPath: string, index: number) => void;
}

export const Panel = (props: IProps) => {
    const [selectionPath, setSelectionPath] = useState("");
    const [showAddBlockDialog, setShowAddBlockDialog] = useState<{ submit: AddBlockDialogSubmitFn } | false>(false);

    const selected = traversePath(props.root, selectionPath);

    const addBlock = (path: string) => {
        // setShowAddBlockDialog({
        //     submit: blockName => {
        //         const blockConfig = findBlockConfigByName(props.blockConfigs, blockName);

        //         if (!blockConfig) {
        //             throw new Error("couldn't find blockConfig");
        //         }

        //         const block: IBlock = {
        //             blockName,
        //             data: blockConfig.getInitialData(),
        //         };

        //         props.addBlock(path)(block);

        //         setShowAddBlockDialog(false);
        //     },
        // });
    };

    const removeBlock = (path: string) => {
        // const parentPath = getPathForParent(path);
        // const index = getIndex(path);

        // const parent = traversePath(props.root, parentPath);

        // // if its the last child
        // // check if there is a prev child and select it
        // // otherwise select the parent

        // if (index === parent.data.children!.length - 1) {
        //     if (parent.data.children!.length > 1) {
        //         setSelectionPath(getPathForChild(parentPath, index - 1));
        //     } else {
        //         setSelectionPath(parentPath);
        //     }
        // }

        // props.removeBlock(parentPath, index);
    };

    return (
        <Container>
            <Outliner blockConfigs={props.blockConfigs} root={props.root} selectionPath={selectionPath} setSelectionPath={setSelectionPath} />

            {showAddBlockDialog
                ? <AddBlockDialog blockConfigs={props.blockConfigs} submit={showAddBlockDialog.submit} close={() => setShowAddBlockDialog(false)} />
                : <BlockEditor
                    block={selected}
                    blockConfigs={props.blockConfigs}
                    isRoot={selectionPath === ""}
                    onChange={props.changeData(selectionPath)}
                />
            }
        </Container>
    );
};
