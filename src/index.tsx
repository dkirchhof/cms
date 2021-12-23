import update from "immer";
import { createContext, useState } from "react";
import { render } from "react-dom";
import { ColumnsBlock } from "./blocks/columnsBlock";
import { HeaderBlock } from "./blocks/headerBlock";
import { HeadingBlock } from "./blocks/headingBlock";
import { ImageBlock } from "./blocks/imageBlock";
import { TextBlock } from "./blocks/textBlock";
import { AddBlockDialog } from "./components/addBlockDialog";
import { Inspector } from "./components/inspector";
import { Outliner } from "./components/outliner";
import { PagePreview } from "./components/pagePreview";
import { GlobalStyles } from "./styles";
import { IBlockConfig, IBlock } from "./types/block";
import { IPage } from "./types/page";
import { traversePath } from "./utils/path";

export type BlocksMap = { [s: string]: IBlockConfig<any>; }

export const BLOCKS: BlocksMap = {
    "HeaderBlock": HeaderBlock,
    "HeadingBlock": HeadingBlock,
    "TextBlock": TextBlock,
    "ImageBlock": ImageBlock,
    "ColumnsBlock": ColumnsBlock,
};

const TEST_PAGE: IPage = {
    slug: "test-page",
    title: "title",
    subtitle: "subtitle",
    createdAt: new Date(), 
    updatedAt: new Date(),
    content: [
        {
            blockName: "HeaderBlock",
            data: {
                imgSrc: "https://i.picsum.photos/id/60/1000/300.jpg?hmac=WmF-em1XlDmu1mGUw-jMk9g4Qr2mbIgTXGCVx03vWfE",
                imgAlt: "desk",
            },
        },
        { 
            blockName: "TextBlock", 
            data: { text: "hello world" },
        },
        { 
            blockName: "TextBlock", 
            data: { text: "hallo welt" } },
        { 
            blockName: "ImageBlock", 
            data: { src: "https://i.picsum.photos/id/101/200/200.jpg?hmac=8aiHS9K78DvBexQ7ZROLuLizDR22o8CcjRMUhHbZU6g", alt: "test bild" },
        },
        {
            blockName: "ColumnsBlock",
            data: {
                gap: 10,
                children: [
                    { blockName: "TextBlock", data: { text: "column 1" } },
                    { blockName: "TextBlock", data: { text: "column 2" } },
                ]
            }
        },
    ]
};

interface IAdminContext {
    page: IPage;
    selectionPath: string;
    setSelectionPath: (path: string) => void;
    addBlock: (path: string) => void;
}

export const Context = createContext<IAdminContext>({ } as any);

const App = () => {
    const [page, setPage] = useState(TEST_PAGE);
    const [selectionPath, setSelectionPath] = useState("0");
    const [showAddBlockDialog, setShowAddBlockDialog] = useState<{ submit: (blockName: string, blockConfig: IBlockConfig<any>) => void; } | false>(false);

    const changeDataOfSelectedBlock = (prop: string) => (value: any) => {
        const updated = update(page => {
            const selectedBlock = traversePath(page.content, selectionPath);
            
            if (selectedBlock) {
                selectedBlock.data[prop] = value;
            }
        }, page);

        setPage(updated);
    };

    const addBlock = (path: string) => {
        setShowAddBlockDialog({
            submit: (blockName, blockConfig) => {
                const updated = update(page => {
                    const newBlock: IBlock = {
                        blockName,
                        data: blockConfig.getInitialData(),
                    };
                    
                    if (!path) {
                        page.content.push(newBlock);
                    } else {
                        const selectedBlock = traversePath(page.content, path);

                        if(selectedBlock) {
                            selectedBlock.data.children!.push(newBlock);
                        }
                    }
                }, page)();

                setPage(updated);
                setSelectionPath(path);
                setShowAddBlockDialog(false);
            },
        });
    };

    const selectedBlock = traversePath(page.content, selectionPath);

    return (
        <Context.Provider value={{ page, selectionPath, setSelectionPath, addBlock }}>
            <GlobalStyles />
            
            <PagePreview content={page.content} />
            <Outliner content={page.content} />

            {!showAddBlockDialog && <Inspector block={selectedBlock} onChange={changeDataOfSelectedBlock} />}
            {showAddBlockDialog && <AddBlockDialog availableBlocks={BLOCKS} submit={showAddBlockDialog.submit} close={() => setShowAddBlockDialog(false)} />}
        </Context.Provider>
    );
};

render(<App />, document.getElementById("app"));
