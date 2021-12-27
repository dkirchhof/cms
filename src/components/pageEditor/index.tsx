import update from "immer";
import { createContext, useState } from "react";
import { ColumnsBlock } from "../../blocks/columnsBlock";
import { HeaderBlock } from "../../blocks/headerBlock";
import { HeadingBlock } from "../../blocks/headingBlock";
import { ImageBlock } from "../../blocks/imageBlock";
import { MaxWidthBlock } from "../../blocks/maxWidthBlock";
import { TextBlock } from "../../blocks/textBlock";
import { IBlockConfig, IBlock } from "../../types/block";
import { IPage, isPage } from "../../types/page";
import { getIndex, getPathForParent, traversePath } from "../../utils/path";
import { Header } from "./header";
import { PagePreview } from "./pagePreview";
import { Panel } from "./panel";
import { Container, Main } from "./styles";

export type BlocksMap = { [s: string]: IBlockConfig<any>; }

export const BLOCKS: BlocksMap = {
    "HeaderBlock": HeaderBlock,
    "HeadingBlock": HeadingBlock,
    "TextBlock": TextBlock,
    "ImageBlock": ImageBlock,
    "MaxWidthBlock": MaxWidthBlock,
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
            blockName: "MaxWidthBlock",
            data: {
                maxWidth: 800,
                children: [
                    {
                        blockName: "TextBlock",
                        data: { text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet." },
                    },
                    {
                        blockName: "TextBlock",
                        data: { text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet." }
                    },
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
                            ],
                        },
                    },
                ],
            },
        },
    ],
};

interface IAdminContext {
    page: IPage;
}

export const Context = createContext<IAdminContext>({} as any);

export const PageEditor = () => {
    const [page, setPage] = useState(TEST_PAGE);

    const changeData = (path: string) => (prop: string) => (value: any) => {
        setPage(
            update(page => {
                const selected = traversePath(page, path);

                if (isPage(selected)) {
                    selected[prop as keyof IPage] = value;
                } else {
                    selected.data[prop] = value;
                }
            }, page)
        );
    };

    const addBlock = (path: string) => (block: IBlock) => {
        setPage(
            update(page => {
                const selected = traversePath(page, path);
                if (isPage(selected)) {
                    selected.content.push(block);
                } else {
                    selected.data.children!.push(block);

                }
            }, page)
        );
    };

    const removeBlock = (path: string) => {
        const parentPath = getPathForParent(path);
        const index = getIndex(path);

        setPage(
            update(page => {
                const selected = traversePath(page, parentPath);

                if (isPage(selected)) {
                    selected.content.splice(index, 1);
                } else {
                    selected.data.children!.splice(index, 1);
                }
            }, page)
        );
    };

    return (
        <Context.Provider value={{ page }}>
            <Container>
                <Header />
                <Main>
                    <PagePreview page={page} />
                    <Panel page={page} changeData={changeData} addBlock={addBlock} removeBlock={removeBlock} />
                </Main>
            </Container>
        </Context.Provider>
    );
};
