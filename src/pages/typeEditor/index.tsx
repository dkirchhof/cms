import { useState } from "react";
import { match } from "ts-pattern";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton, SecondaryButton } from "../../components/button";
import { ErrorDisplay } from "../../components/errorDisplay";
import { BUTTON_RESET, BUTTON_SAVE } from "../../messages";
import { ICustomTypeConfig } from "../../types/customType";
import { Header } from "../pageStyles";
import { Container, Fields, Label, Main } from "./styles";
import { useLoadCustomTypeItem } from "./useLoadCustomTypeItem";

export const TypeEditor = () => {
    const state = useLoadCustomTypeItem();

    return match(state)
        .with({ state: "LOADING" }, () => <LoadingTypeEditor />)
        .with({ state: "LOADED" }, ({ typeConfig, item }) => <LoadedTypeEditor typeConfig={typeConfig} item={item} />)
        .with({ state: "ERROR" }, ({ message }) => <ErrorTypeEditor message={message} />)
        .exhaustive();
};

const LoadingTypeEditor = () => {
    return (
        <Container>Loading...</Container>
    );
};

const LoadedTypeEditor = (props: { typeConfig: ICustomTypeConfig<any>; item: any; }) => {
    const [editedFields, setEditedFields] = useState<any>({});

    const reset = () => {
        setEditedFields({});
    };

    const save = () => {
        console.log(editedFields);
    };

    const changeField = (prop: string) => (value: any) => {
        setEditedFields({
            ...editedFields,
            [prop]: value,
        });
    };

    const label = props.typeConfig.getLabel(props.item);
    const inputs = props.typeConfig.getEditorInputs();

    return (
        <Container>
            <Header>
                <Breadcrumb crumbs={[
                    { urlSegment: `content/${props.typeConfig.pluralName}`, label: props.typeConfig.pluralName },
                    { label: label  },
                ]}/>

                <SecondaryButton onClick={reset}>{BUTTON_RESET}</SecondaryButton>
                <PrimaryButton onClick={save}>{BUTTON_SAVE}</PrimaryButton>
            </Header>
            
            <Main>
                <Fields>
                    {Object.entries(inputs).map(([prop, Input]) => {
                        if (!Input) {
                            return null;
                        }

                        const value = (editedFields[prop] !== undefined) ? editedFields[prop] : props.item[prop];
                        const onChange = changeField(prop);

                        return (
                            <Label key={prop}>
                                {prop}
                                <Input prop={prop} value={value} onChange={onChange} />
                            </Label>
                        );
                    })}
                </Fields>
            </Main>
        </Container>
    );
};

const ErrorTypeEditor = (props: { message: string; }) => (
    <Container>
        <ErrorDisplay message={props.message} />
    </Container>
);
