import { TextEditor } from "../../../../editors/textEditor";
import { ADD_BLOCK, PAGE } from "../../../../messages";
import { IPage } from "../../../../types/page";
import { PropEditor } from "../../../../types/propEditor";
import { PrimaryButton } from "../../../button";
import { Name, Container, Label } from "../editorStyles";

const INPUTS: { [prop in keyof Omit<IPage, "content">]?: PropEditor<IPage[prop]>; } = {
    slug: TextEditor, 
    title: TextEditor,
    subtitle: TextEditor,
};

interface IProps {
    page: IPage;

    onChange: (prop: string) => (value: any) => void;
    addBlock: () => void;
    removeBlock: () => void;
}

export const PageSettingsEditor = (props: IProps) => (
    <Container>
        <Name>{PAGE}</Name>

        {Object.entries(INPUTS).map(([prop, Input]) => {
            if (!Input) {
                return null;
            }

            return (
                <Label key={prop}>
                    {prop}
                    <Input value={props.page[prop as keyof IPage] as any} onChange={props.onChange(prop)} />
                </Label>
            );
        })}

        <PrimaryButton onClick={props.addBlock}>{ADD_BLOCK}</PrimaryButton>
    </Container>
);
