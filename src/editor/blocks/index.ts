import { BlocksMap } from "../types/block";
import { ColumnsBlock } from "./columnsBlock";
import { HeaderBlock } from "./headerBlock";
import { HeadingBlock } from "./headingBlock";
import { ImageBlock } from "./imageBlock";
import { MaxWidthBlock } from "./maxWidthBlock";
import { RootBlock } from "./rootBlock";
import { TextBlock } from "./textBlock";

export const BLOCKS: BlocksMap = {
    "Root": RootBlock,
    "Header": HeaderBlock,
    "Heading": HeadingBlock,
    "Paragraph": TextBlock,
    "Image": ImageBlock,
    "MaxWidth": MaxWidthBlock,
    "Columns": ColumnsBlock,
};
