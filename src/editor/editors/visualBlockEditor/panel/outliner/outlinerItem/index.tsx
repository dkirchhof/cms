import { BlockConfigs, IBlock } from "../../../../../../types/block";
import { findBlockConfigByName } from "../../../../../../utils/findBlockConfig";
import { useContextMenu } from "../../../../../components/contextMenu";
import { CTX_MENU_DELETE, CTX_MENU_EDIT } from "../../../../../messages";
import { getPathForChild } from "../../../../../utils/path";
import { useCMS } from "../../../hooks/useCMS";
import { BlockLabel, BlockName, ChildList, Tile } from "./styles";

interface IProps {
    path: string;
    block: IBlock;
    blockConfigs: BlockConfigs;
}

export const OutlinerItem = ({ block, path, ...props }: IProps) => {
    const { selection, setSelection, removeBlock } = useCMS();

    const blockConfig = findBlockConfigByName(props.blockConfigs, block.blockName);

    if (!blockConfig) {
        throw new Error("couldn't find blockConfig");
    }

    const { ContextMenu, openContextMenu } = useContextMenu([
        { label: CTX_MENU_EDIT, action: () => setSelection({ id: block.id, path }) },
        { label: CTX_MENU_DELETE, action: () => removeBlock(path) },
    ]);

    const label = blockConfig.toString(block.data);

    return (
        <div>
            <Tile selected={selection ? block.id === selection.id : false} onClick={() => setSelection({ id: block.id, path })} onContextMenu={openContextMenu}>
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
        </div>
    );
};
