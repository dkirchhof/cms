import update from "immer";
import { useEffect, useState } from "react";
import { BlockConfigs, IBlock, IBlockConfig } from "../../../types/block";
import { PrimaryButton, SecondaryButton } from "../../components/button";
import { BUTTON_CANCEL, BUTTON_SAVE, OPEN_EDITOR } from "../../messages";
import { Header } from "../../pages/pageStyles";
import { IPropEditorProps } from "../../types/propEditor";
import { getParentPathAndIndex, getPath, getPathForChild, traversePath } from "../../utils/path";
import { BlockEditor } from "./components/blockEditor";
import { Outliner } from "./components/outliner";
import { Preview } from "./components/preview";
import { CMSContext } from "./contexts/cmsContext";
import { Container, Main, Name } from "./styles";
import { Selection } from "./types";
import { createBlock } from "./utils/createBlock";

interface IOptions {
    blockConfigs: BlockConfigs;
}

export const visualBlockEditorFactory = (options: IOptions) => (props: IPropEditorProps<IBlock[]>) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const open = () => {
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
    };

    const save = (value: IBlock[]) => {
        props.onChange(value);
        close();
    };

    return (
        <>
            <SecondaryButton onClick={open}>{OPEN_EDITOR}</SecondaryButton>

            {isOpen && <Editor blockConfigs={options.blockConfigs} value={props.value} close={close} save={save} />}
        </>
    );
};

interface IProps {
    blockConfigs: BlockConfigs;
    value: IBlock[];
    close: () => void;
    save: (value: IBlock[]) => void;
}

const Editor = (props: IProps) => {
    const [value, setValue] = useState<IBlock[]>(props.value);
    const [hasChanges, setHasChanges] = useState(false);
    const [selection, setSelection] = useState<Selection>(null);
    const selectedBlock = selection && traversePath(value, selection);

    const changeData = (path: string) => (prop: string) => (dataValue: any) => {
        if (path === "") {
            return;
        }

        const newValue = update(value => {
            traversePath(value, path).data[prop] = dataValue;
        }, value)();

        setValue(newValue);
        setHasChanges(true);
    };

    const addBlock = (blockConfig: IBlockConfig<any>, parentPath: string | null, index: number) => {
        const block = createBlock(blockConfig);

        const newValue = update(value, value => {
            if (parentPath) {
                traversePath(value, parentPath).data.children!.splice(index, 0, block);
            } else {
                value.splice(index, 0, block);
            }
        });

        setValue(newValue);
        setHasChanges(true)
        setSelection(getPathForChild(parentPath, index));
    };

    const removeBlock = (path: string) => {
        const selectedBlock = selection && traversePath(value, selection);

        const { parentPath, index } = getParentPathAndIndex(path);

        const newValue = update(value, value => {
            if (parentPath) {
                traversePath(value, parentPath).data.children!.splice(index, 1);
            } else {
                value.splice(index, 1);
            }
        });

        setValue(newValue);
        setHasChanges(true);

        if (selectedBlock) {
            setSelection(getPath(newValue, selectedBlock.id));
        }
    };
    
    const onCancelClick = () => {
        props.close();
    };

    const onSaveClick = () => {
        props.save(value);
    };

    return (
        <CMSContext.Provider value={{ selection, setSelection, blockConfigs: props.blockConfigs, addBlock, removeBlock }}>
            <Container>
                <Header>
                    <Name>Block Editor</Name>
                    <SecondaryButton onClick={onCancelClick}>{BUTTON_CANCEL}</SecondaryButton>
                    <PrimaryButton onClick={onSaveClick} disabled={!hasChanges}>{BUTTON_SAVE}</PrimaryButton>
                </Header>
                <Main>
                    <Preview blocks={value} />
                    <Outliner blocks={value} />
                    {selectedBlock && <BlockEditor block={selectedBlock} onChange={changeData(selection)} />}
                </Main>
            </Container>
        </CMSContext.Provider>
    );
};
