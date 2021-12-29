import { DateEditor } from "../editors/dateEditor";
import { TextEditor } from "../editors/textEditor";
import { VisualBlockEditor } from "../editors/visualBlockEditor";
import { IBlock } from "../types/block";
import { ICustomTypeConfig } from "../types/customType";

export interface IPage {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    publishedFrom: string | null;
    publishedTo: string | null;
    createdAt: Date;
    updatedAt: Date;
    content: IBlock;
}

export const PageType: ICustomTypeConfig<IPage> = {
    singularName: "page",
    pluralName: "pages",

    getLabel: type => type.title,

    getEditorInputs: () => ({
        slug: TextEditor,
        title: TextEditor,
        subtitle: TextEditor,
        publishedFrom: DateEditor,
        publishedTo: DateEditor,
        content: VisualBlockEditor,
    }),
};
