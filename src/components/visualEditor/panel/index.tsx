import { useState } from "react";
import { BLOCKS } from "..";
import { IBlock } from "../../../types/block";
import { getIndex, getPathForChild, getPathForParent, traversePath } from "../../../utils/path";
import { AddBlockDialog, SubmitFn as AddBlockDialogSubmitFn } from "./addBlockDialog";
import { BlockEditor } from "./blockEditor";
import { Outliner } from "./outliner";
import { Container } from "./styles";

interface IProps {
    root: IBlock;

    changeData: (path: string) => (prop: string) => (value: any) => void;
    addBlock: (path: string) => (block: IBlock) => void;
    removeBlock: (parentPath: string, index: number) => void;
}

export const Panel = (props: IProps) => {
    const [selectionPath, setSelectionPath] = useState("");
    const [showAddBlockDialog, setShowAddBlockDialog] = useState<{ submit: AddBlockDialogSubmitFn } | false>(false);

    const selected = traversePath(props.root, selectionPath);

    const addBlock = (path: string) => {
        setShowAddBlockDialog({
            submit: blockName => {
                const blockConfig = BLOCKS[blockName];
                
                const block: IBlock = {
                    blockName,
                    data: blockConfig.getInitialData(),
                };

                props.addBlock(path)(block);

                setShowAddBlockDialog(false);
            },
        });
    };

    const removeBlock = (path: string) => {
        const parentPath = getPathForParent(path);
        const index = getIndex(path);

        const parent = traversePath(props.root, parentPath);

        // if its the last child
        // check if there is a prev child and select it
        // otherwise select the parent

        if (index === parent.data.children!.length - 1) {
            if (parent.data.children!.length > 1) {
                setSelectionPath(getPathForChild(parentPath, index - 1));
            } else {
                setSelectionPath(parentPath);
            }
        }

        props.removeBlock(parentPath, index);
    };

    return (
        <Container>
            <Outliner root={props.root} selectionPath={selectionPath} setSelectionPath={setSelectionPath} />

            {showAddBlockDialog 
                ? <AddBlockDialog submit={showAddBlockDialog.submit} close={() => setShowAddBlockDialog(false)} />
                : <BlockEditor 
                    block={selected} 
                    isRoot={selectionPath === ""}
                    onChange={props.changeData(selectionPath)} 
                    addBlock={() => addBlock(selectionPath)}
                    removeBlock={() => removeBlock(selectionPath)}
                  />
            }
        </Container>
    );
};
