import { useState } from "react";
import { IBlock } from "../../../../types/block";
import { findBlockConfigByName } from "../../../../utils/findBlockConfig";
import { getIndex, getPathForChild, getPathForParent, traversePath } from "../../../utils/path";
import { Selection } from "../types";
import { AddBlockDialog, SubmitFn as AddBlockDialogSubmitFn } from "./addBlockDialog";
import { BlockEditor } from "./blockEditor";
import { Outliner } from "./outliner";
import { Container } from "./styles";

interface IProps {
    blocks: IBlock[];

    changeData: (path: string) => (prop: string) => (value: any) => void;

    addBlock: (path: string) => (block: IBlock) => void;
}

export const Panel = (props: IProps) => {
    const [showAddBlockDialog, setShowAddBlockDialog] = useState<{ submit: AddBlockDialogSubmitFn } | false>(false);

    // const selected = traversePath(props.blocks, props.selectionPath);

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

    return (
        <Container>
            <Outliner blocks={props.blocks} />

            {/* {showAddBlockDialog */}
            {/*     ? <AddBlockDialog blockConfigs={props.blockConfigs} submit={showAddBlockDialog.submit} close={() => setShowAddBlockDialog(false)} /> */}

            {/* {selected && ( */}
            {/*     <BlockEditor */}
            {/*         blockConfigs={props.blockConfigs} */}
            {/*         block={selected} */}
            {/*         onChange={props.changeData(props.selectionPath)} */}
            {/*     /> */}
            {/* )} */}
        </Container>
    );
};
