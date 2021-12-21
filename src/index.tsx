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
import { IBlockConfig, IDeserializedBlock, ISerializedBlock } from "./types/block";
import { IPage } from "./types/page";
import { traversePath } from "./utils/path";

export type BlocksMap = { [s: string]: IBlockConfig<any>; }

// const serializeBlock = (deserializedBlock: IDeserializedBlock): ISerializedBlock => {
//     return {
//         blockName: deserializedBlock.blockName,
//         data: deserializedBlock.data,
//     };
// };

const deserializeData = (data: any) => {
    return Object.entries(data).reduce((prev, [prop, value]: [string, any]) => ({
        ...prev,
        [prop]: prop === "children" ? value.map(deserializeBlock) : value,
    }), {});
};

const deserializeBlock = (serializedBlock: ISerializedBlock): IDeserializedBlock => {
    const block = BLOCKS[serializedBlock.blockName];

    if (!block) {
        throw new Error(`{block.block} not implemented`);
    }

    return {
        ...serializedBlock,
        ...block,
        data: deserializeData(serializedBlock.data),
    };
};

// const serializeContent = (content: IDeserializedBlock[]) => content.map(serializeBlock);
// const deserializeContent = (content: ISerializedBlock[]) => content.map(deserializeBlock);

const BLOCKS: BlocksMap = {
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
};

const TEST_CONTENT: ISerializedBlock[] = [
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
];

export const PageContext = createContext(TEST_PAGE);

const App = () => {
    const [page, setPage] = useState(TEST_PAGE);
    const [content, setContent] = useState(TEST_CONTENT.map(deserializeBlock));
    const [selectionPath, setSelectionPath] = useState("0");
    const [showAddBlockDialog, setShowAddBlockDialog] = useState<{ submit: (blockName: string, blockConfig: IBlockConfig<any>) => void; } | false>(false);

    const changeDataOfSelectedBlock = (prop: string) => (value: any) => {
        const updatedContent = update(content => {
            const selectedBlock = traversePath(content, selectionPath);
            
            if (selectedBlock) {
                selectedBlock.data[prop] = value;
            }
        }, content);

        setContent(updatedContent);
    };

    const addNewBlock = (path: string) => {
        setShowAddBlockDialog({
            submit: (blockName, blockConfig) => {
                const updatedContent = update(content => {
                    const newBlock: IDeserializedBlock = {
                        blockName,
                        data: blockConfig.getInitialData(),
                        ...blockConfig,
                    };
                    
                    if (!path) {
                        content.push(newBlock);
                    } else {
                        const selectedBlock = traversePath(content, path);

                        if(selectedBlock) {
                            selectedBlock.data.children!.push(newBlock);
                        }
                    }
                }, content)();

                setContent(updatedContent);
                setSelectionPath(path);
                setShowAddBlockDialog(false);
            },
        });
    };

    const selectedBlock = traversePath(content, selectionPath);

    return (
        <PageContext.Provider value={page}>
            <GlobalStyles />
            
            <PagePreview content={content} />
            <Outliner content={content} currentSelectionPath={selectionPath} addNewBlock={addNewBlock} selectBlock={setSelectionPath} />

            {!showAddBlockDialog && <Inspector block={selectedBlock} onChange={changeDataOfSelectedBlock} />}
            {showAddBlockDialog && <AddBlockDialog availableBlocks={BLOCKS} submit={showAddBlockDialog.submit} close={() => setShowAddBlockDialog(false)} />}
        </PageContext.Provider>
    );
};

render(<App />, document.getElementById("app"));
