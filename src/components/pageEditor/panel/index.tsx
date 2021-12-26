import { useState } from "react";
import { BLOCKS } from "..";
import { IBlock } from "../../../types/block";
import { IPage, isPage } from "../../../types/page";
import { traversePath } from "../../../utils/path";
import { AddBlockDialog, SubmitFn as AddBlockDialogSubmitFn } from "./addBlockDialog";
import { BlockEditor } from "./blockEditor";
import { Outliner } from "./outliner";
import { PageSettingsEditor } from "./pageSettingsEditor";
import { Container } from "./styles";

interface IProps {
    page: IPage;

    changeData: (path: string) => (prop: string) => (value: any) => void;
    addBlock: (path: string) => (block: IBlock) => void;
    removeBlock: (path: string) => void;
}

export const Panel = (props: IProps) => {
    const [selectionPath, setSelectionPath] = useState("");
    const [showAddBlockDialog, setShowAddBlockDialog] = useState<{ submit: AddBlockDialogSubmitFn } | false>(false);

    const selected = traversePath(props.page, selectionPath);

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

    return (
        <Container>
            <Outliner page={props.page} selectionPath={selectionPath} setSelectionPath={setSelectionPath} />

            {showAddBlockDialog 
                ? <AddBlockDialog submit={showAddBlockDialog.submit} close={() => setShowAddBlockDialog(false)} />
                : isPage(selected)
                    ? <PageSettingsEditor
                        page={props.page}
                        onChange={props.changeData(selectionPath)}
                        addBlock={() => addBlock(selectionPath)}
                        removeBlock={() => props.removeBlock(selectionPath)}
                      />
                    : <BlockEditor 
                        block={selected} 
                        onChange={props.changeData(selectionPath)} 
                        addBlock={() => addBlock(selectionPath)}
                        removeBlock={() => props.removeBlock(selectionPath)}
                      />
            }

        </Container>
    );
};
