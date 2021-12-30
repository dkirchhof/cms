import { useState } from "react";
import { match } from "ts-pattern";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton, SecondaryButton } from "../../components/button";
import { ErrorDisplay } from "../../components/errorDisplay";
import { BUTTON_RESET, BUTTON_SAVE } from "../../messages";
import { ICustomTypeConfig } from "../../types/customType";
import { Header } from "../pageStyles";
import { Container, Fields, Label, Main } from "./styles";
import { useLoadItem } from "./useLoadItem";

export const ItemEditor = () => {
    const state = useLoadItem();

    return match(state)
        .with({ state: "LOADING" }, () => <Loading />)
        .with({ state: "LOADED" }, ({ typeName, typeConfig, item }) => <Loaded typeName={typeName} typeConfig={typeConfig} item={item} />)
        .with({ state: "ERROR" }, ({ message }) => <Error message={message} />)
        .exhaustive();
};

const Loading = () => {
    return (
        <Container>Loading...</Container>
    );
};

const Loaded = (props: { typeName: string; typeConfig: ICustomTypeConfig<any>; item: any; }) => {
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
                    { urlSegment: `content/${props.typeName}`, label: props.typeName },
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

const Error = (props: { message: string; }) => (
    <Container>
        <ErrorDisplay message={props.message} />
    </Container>
);
