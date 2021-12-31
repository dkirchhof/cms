import { useState } from "react";
import { match } from "ts-pattern";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton, SecondaryButton } from "../../components/button";
import { ErrorDisplay } from "../../components/errorDisplay";
import { BUTTON_RESET, BUTTON_SAVE } from "../../messages";
import { ICustomType, ICustomTypeConfig } from "../../types/customType";
import { PropEditor } from "../../types/propEditor";
import { mapObject } from "../../utils/mapObject";
import { Header } from "../pageStyles";
import { Container, Fields, Label, Main } from "./styles";
import { useLoadItem } from "./useLoadItem";

export const ItemEditor = <T extends any>() => {
    const state = useLoadItem<T>();

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

const Loaded = <T extends any>(props: { typeName: string; typeConfig: ICustomTypeConfig<T>; item: ICustomType<T>; }) => {
    const [editedFields, setEditedFields] = useState<Partial<T>>({});

    const reset = () => {
        setEditedFields({});
    };

    const save = () => {
        console.log(editedFields);
    };

    const changeField = <P extends keyof T>(prop: P) => (value: T[P]) => {
        setEditedFields({
            ...editedFields,
            [prop]: value,
        });
    };

    const label = props.typeConfig.getLabel(props.item.data);
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
                    {mapObject<keyof T, PropEditor<any>>(inputs, ([prop, Input]) => {
                        if (!Input) {
                            return null;
                        }

                        const value = (editedFields[prop] !== undefined) ? editedFields[prop] : props.item.data[prop];
                        const onChange = changeField(prop);

                        return (
                            <Label key={prop.toString()}>
                                {prop}
                                <Input prop={prop.toString()} value={value} onChange={onChange} />
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
