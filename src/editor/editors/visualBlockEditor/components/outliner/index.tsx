import { useState } from "react";
import { IBlock, IBlockConfig } from "../../../../../types/block";
import { PrimaryButton } from "../../../../components/button";
import { ADD_FIRST_BLOCK } from "../../../../messages";
import { getPathForChild } from "../../../../utils/path";
import { useCMS } from "../../hooks/useCMS";
import { AddBlockDialog } from "../addBlockDialog";
import { OutlinerItem } from "./outlinerItem";
import { Container } from "./styles";

interface IProps {
    blocks: IBlock[];
}

export const Outliner = (props: IProps) => {
    if (!props.blocks.length) {
        const cms = useCMS();

        const [showAddBlockDialog, setShowBlockDialog] = useState(false);

        const onAddBlockDialogSubmit = (blockConfig: IBlockConfig<any, any>) => {
            cms.addBlock(blockConfig, null, 0);
        };

        return (
            <Container>
                <PrimaryButton onClick={() => setShowBlockDialog(true)}>{ADD_FIRST_BLOCK}</PrimaryButton>

                {showAddBlockDialog && <AddBlockDialog submit={onAddBlockDialogSubmit} close={() => setShowBlockDialog(false)} />}
            </Container>
        );
    }

    return (
        <Container>
            {props.blocks.map((block, i) => {
                const path = getPathForChild(null, i);

                return <OutlinerItem key={path} block={block} path={path} />;
            })}
        </Container>
    );
};
