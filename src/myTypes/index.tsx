import { ICustomTypeConfig } from "../types/customType";
import { PageType, IPage } from "./page";

export const MY_TYPES: ICustomTypeConfig<any>[] = [
    PageType,
];

// todo: remove mock data
export const MY_PAGES: IPage[] = [
    {
        id: "f3405fglsdfshlk4",
        slug: "test-page",
        title: "my first page",
        subtitle: "this is a subtitle",
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
    },
];
