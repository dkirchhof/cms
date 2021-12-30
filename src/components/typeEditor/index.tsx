import { useState } from "react";
import { Navigate } from "react-router";
import { match } from "ts-pattern";
import { BUTTON_RESET, BUTTON_SAVE } from "../../messages";
import { ICustomTypeConfig } from "../../types/customType";
import { Breadcrumb } from "../breadcrumb";
import { Container, Header, Label } from "./styles";
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
                    { urlSegment: props.typeConfig.pluralName, label: props.typeConfig.pluralName },
                    { label: label  },
                ]}/>
            </Header>

            <button onClick={reset}>{BUTTON_RESET}</button>
            <button onClick={save}>{BUTTON_SAVE}</button>

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
        </Container>
    );
};

const ErrorTypeEditor = (props: { message: string; }) => {
    return (
        <Navigate to="/404" replace />
    );
};
