import { useState } from "react";
import { match } from "ts-pattern";
import { IBlock, IBlockConfig } from "../../../../../../types/block";
import { findBlockConfigByName } from "../../../../../../utils/findBlockConfig";
import { useContextMenu } from "../../../../../components/contextMenu";
import { CTX_MENU_ADD_CHILD_BLOCK_FIRST, CTX_MENU_ADD_CHILD_BLOCK_LAST, CTX_MENU_ADD_SIBLING_BLOCK_AFTER, CTX_MENU_ADD_SIBLING_BLOCK_BEFORE, CTX_MENU_DELETE, CTX_MENU_EDIT } from "../../../../../messages";
import { getParentPathAndIndex, getPathForChild } from "../../../../../utils/path";
import { useCMS } from "../../../hooks/useCMS";
import { AddBlockDialog } from "../../addBlockDialog";
import { BlockLabel, BlockName, ChildList, Tile } from "./styles";

interface IProps {
    path: string;
    block: IBlock;
}

type AddBlockDialogMode = "ADD_CHILD_FIRST" | "ADD_CHILD_LAST" | "ADD_SIBLING_BEFORE" | "ADD_SIBLING_AFTER" | null;

export const OutlinerItem = ({ block, path, ...props }: IProps) => {
    const cms = useCMS();

    const blockConfig = findBlockConfigByName(cms.blockConfigs, block.blockName);

    if (!blockConfig) {
        throw new Error("couldn't find blockConfig");
    }

    const [addBlockDialogMode, setAddBlockDialogMode] = useState<AddBlockDialogMode>(null);

    const onAddBlockDialogSubmit = (blockConfig: IBlockConfig<any, any>) => {
        match(addBlockDialogMode)
            .with("ADD_SIBLING_BEFORE", () => {
                const { parentPath, index } = getParentPathAndIndex(path);

                cms.addBlock(blockConfig, parentPath, index);
            })
            .with("ADD_SIBLING_AFTER", () => {
                const { parentPath, index } = getParentPathAndIndex(path);

                cms.addBlock(blockConfig, parentPath, index + 1);
            })
            .with("ADD_CHILD_FIRST", () => {
                cms.addBlock(blockConfig, path, 0);
            })
            .with("ADD_CHILD_LAST", () => {
                cms.addBlock(blockConfig, path, block.data.children!.length);
            })
            .with(null, () => { })
            .exhaustive();

        setAddBlockDialogMode(null);
    };

    const onAddBlockDialogClose = () => {
        setAddBlockDialogMode(null);
    };

    const { ContextMenu, openContextMenu } = useContextMenu([
        [
            { label: CTX_MENU_EDIT, action: () => cms.setSelection(path) },
        ],
        [
            { label: CTX_MENU_ADD_SIBLING_BLOCK_BEFORE, action: () => setAddBlockDialogMode("ADD_SIBLING_BEFORE") },
            { label: CTX_MENU_ADD_SIBLING_BLOCK_AFTER, action: () => setAddBlockDialogMode("ADD_SIBLING_AFTER") },
            block.data.children  && { label: CTX_MENU_ADD_CHILD_BLOCK_FIRST, action: () => setAddBlockDialogMode("ADD_CHILD_FIRST") },
            block.data.children && { label: CTX_MENU_ADD_CHILD_BLOCK_LAST, action: () => setAddBlockDialogMode("ADD_CHILD_LAST") },
        ],
        [
            { label: CTX_MENU_DELETE, action: () => cms.removeBlock(path) },
        ],
    ]);

    const label = blockConfig.toString(block.data);

    return (
        <div>
            <Tile selected={path === cms.selection} onClick={() => cms.setSelection(path)} onContextMenu={openContextMenu}>
                <BlockName>{block.blockName}</BlockName>
                {label && <BlockLabel>{label}</BlockLabel>}

                <ContextMenu />
            </Tile>

            {block.data.children && (
                <ChildList>
                    {block.data.children.map((childBlock, i) => {
                        const childPath = getPathForChild(path, i);

                        return (
                            <OutlinerItem 
                                key={childPath}
                                block={childBlock} 
                                path={childPath} 
                                {...props} 
                            />
                        );
                    })}
                </ChildList>
            )}

            {addBlockDialogMode !== null && <AddBlockDialog submit={onAddBlockDialogSubmit} close={onAddBlockDialogClose} />}
        </div>
    );
};
