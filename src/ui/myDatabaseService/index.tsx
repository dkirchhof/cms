// // mock data
// const ITEMS: ICustomType<any>[] = [
//     {
//         typeName: "Page",
//         id: "f3405fglsdfshlk4",
//         createdAt: "",
//         updatedAt: "",
//         data: {
//             slug: "test-page",
//             title: "my first page",
//             subtitle: "this is a subtitle",
//             publishedFrom: null,
//             publishedTo: null,
//             content: {
//                 blockName: "Root",
//                 data: {
//                     children: [
//                         {
//                             blockName: "Header",
//                             data: {
//                                 imgSrc: "https://i.picsum.photos/id/60/1000/300.jpg?hmac=WmF-em1XlDmu1mGUw-jMk9g4Qr2mbIgTXGCVx03vWfE",
//                                 imgAlt: "desk",
//                             },
//                         },
//                         {
//                             blockName: "MaxWidth",
//                             data: {
//                                 maxWidth: 800,
//                                 children: [
//                                     {
//                                         blockName: "Paragraph",
//                                         data: { text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet." },
//                                     },
//                                     {
//                                         blockName: "Paragraph",
//                                         data: { text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet." }
//                                     },
//                                     {
//                                         blockName: "Image",
//                                         data: { src: "https://i.picsum.photos/id/101/200/200.jpg?hmac=8aiHS9K78DvBexQ7ZROLuLizDR22o8CcjRMUhHbZU6g", alt: "test bild" },
//                                     },
//                                     {
//                                         blockName: "Columns",
//                                         data: {
//                                             gap: 10,
//                                             children: [
//                                                 { blockName: "Paragraph", data: { text: "column 1" } },
//                                                 { blockName: "Paragraph", data: { text: "column 2" } },
//                                             ],
//                                         },
//                                     },
//                                 ],
//                             },
//                         },
//                     ],
//                 },
//             },
//         },
//     },
// ];

// export const getItemsOfType = (typeName: string) => {
//     return ITEMS.filter(item => item.typeName === typeName);
// };

// export const getItemOfType = (typeName: string, id: string) => {
//     const item = ITEMS.find(item => item.typeName === typeName && item.id === id);

//     if (!item) {
//         throw new Error("couldn't find item");
//     }

//     return item;
// };
