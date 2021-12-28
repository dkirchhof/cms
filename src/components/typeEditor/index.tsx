import { useState } from "react";
import { Navigate } from "react-router";
import { match } from "ts-pattern";
import { BUTTON_RESET, BUTTON_SAVE, EDIT_TYPE_HEADER } from "../../messages";
import { ICustomTypeConfig } from "../../types/customType";
import { Container, Heading, Label } from "./styles";
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

    const inputs = props.typeConfig.getEditorInputs();

    return (
        <Container>
            <Heading>{EDIT_TYPE_HEADER(props.typeConfig.singularName)}</Heading>

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
                        <Input value={value} onChange={onChange} />
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
