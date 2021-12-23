import { TextEditor } from "../../editors/textEditor";
import { useContext } from "../../hooks/useContext";
import { IBlockConfig } from "../../types/block";
import { HeaderContainer } from "./styles";

interface IData {
    imgAlt: string;
    imgSrc: string;
}

export const HeaderBlock: IBlockConfig<IData> = {
    getInitialData: () => ({
        imgAlt: "",
        imgSrc: "",
    }),

    getEditorInputs: () => ({
        imgAlt: TextEditor,
        imgSrc: TextEditor,
    }),

    getLabel: _data => "",

    Component: props => {
        const { page } = useContext();

        return (
            <HeaderContainer>
                <img src={props.data.imgSrc} alt={props.data.imgAlt} />
                <div>
                    <h1>{page.title}</h1>
                    <h2>{page.subtitle}</h2>
                </div>
            </HeaderContainer>
        );
    },
};
