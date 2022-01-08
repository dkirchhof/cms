import { TextEditor } from "../../editors/textEditor";
import { IBlockConfig } from "../../types/block";

interface IData {
    alt: string;
    src: string;
}

export const ImageBlock: IBlockConfig<IData> = {
    getInitialData: () => ({
        alt: "",
        src: "",
    }),

    getEditorInputs: () => ({
        alt: TextEditor,
        src: TextEditor,
    }),

    getLabel: data => data.alt || data.src,

    Component: props => (
        <img src={props.data.src} alt={props.data.alt} />
    ),
};
