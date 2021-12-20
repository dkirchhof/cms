import { TextEditor } from "../../editors/textEditor";
import { BlockComponent, GetBlockEditorInputs, GetBlockInitialData, GetBlockLabel, IBlockConfig } from "../../types/block";
import { HeaderContainer } from "./styles";

interface IData {
    headline: string;
    subheadline: string;
    imgAlt: string;
    imgSrc: string;
}

const getInitialData: GetBlockInitialData<IData> = () => ({
    headline: "Headline",
    subheadline: "Subheadline",
    imgAlt: "",
    imgSrc: "",
});

const getEditorInputs: GetBlockEditorInputs<IData> = () => ({
    headline: TextEditor,
    subheadline: TextEditor,
    imgAlt: TextEditor,
    imgSrc: TextEditor,
});

const getLabel: GetBlockLabel<IData> = data => data.headline;

const Component: BlockComponent<IData> = props => (
    <HeaderContainer>
        <img src={props.data.imgSrc} alt={props.data.imgAlt} />
        <div>
            <h1>{props.data.headline}</h1>
            <h2>{props.data.subheadline}</h2>
        </div>
    </HeaderContainer>
);

export const HeaderBlock: IBlockConfig<IData> = {
    getInitialData,
    getEditorInputs,
    getLabel,
    Component,
};
