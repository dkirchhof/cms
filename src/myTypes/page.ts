import { TextEditor } from "../editors/textEditor";
import { IBlock } from "../types/block";
import { ICustomTypeConfig } from "../types/customType";

export interface IPage {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    publishedFrom?: Date;
    publishedTo?: Date;
    createdAt: Date;
    updatedAt: Date;
    content: IBlock[];
}

export const PageType: ICustomTypeConfig<IPage> = {
    singularName: "page",
    pluralName: "pages",

    getLabel: type => type.title,

    getEditorInputs: () => ({
        slug: TextEditor,
        title: TextEditor,
        subtitle: TextEditor,
    }),
};
