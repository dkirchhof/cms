import { useContext } from "react";
import { PageContext } from "../..";
import { TextEditor } from "../../editors/textEditor";
import { BlockComponent, GetBlockEditorInputs, GetBlockInitialData, GetBlockLabel, IBlockConfig } from "../../types/block";
import { HeaderContainer } from "./styles";

interface IData {
    imgAlt: string;
    imgSrc: string;
}

const getInitialData: GetBlockInitialData<IData> = () => ({
    imgAlt: "",
    imgSrc: "",
});

const getEditorInputs: GetBlockEditorInputs<IData> = () => ({
    imgAlt: TextEditor,
    imgSrc: TextEditor,
});

const getLabel: GetBlockLabel<IData> = _data => "";

const Component: BlockComponent<IData> = props => {
    const page = useContext(PageContext);
    
    return (
        <HeaderContainer>
            <img src={props.data.imgSrc} alt={props.data.imgAlt} />
            <div>
                <h1>{page.title}</h1>
                <h2>{page.subtitle}</h2>
            </div>
        </HeaderContainer>
    );
};

export const HeaderBlock: IBlockConfig<IData> = {
    getInitialData,
    getEditorInputs,
    getLabel,
    Component,
};
