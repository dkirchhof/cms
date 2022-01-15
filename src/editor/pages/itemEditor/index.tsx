import { useState } from "react";
import { useNavigate } from "react-router";
import { match } from "ts-pattern";
import { GetItemEditingType, IItemTypeConfig, ItemTypeConfigs } from "../../../types/itemTypeConfig";
import { deleteItem, updateItem } from "../../api";
import { Breadcrumb } from "../../components/breadcrumb";
import { DangerousButton, PrimaryButton, SecondaryButton } from "../../components/button";
import { ErrorDisplay } from "../../components/errorDisplay";
import { useNotifications } from "../../components/notifications";
import { BUTTON_DELETE, BUTTON_RESET, BUTTON_UPDATE, ITEM_DELETED, ITEM_UPDATED } from "../../messages";
import { PropEditor } from "../../types/propEditor";
import { mapObject } from "../../utils/mapObject";
import { Header } from "../pageStyles";
import { Container, Fields, Label, Main } from "./styles";
import { useLoadItem } from "./useLoadItem";

export const itemEditorFactory = (itemTypeConfigs: ItemTypeConfigs) => () => {
    const state = useLoadItem(itemTypeConfigs);

    return match(state)
        .with({ state: "LOADING" }, () => <Loading />)
        .with({ state: "LOADED" }, ({ itemTypeConfig, item }) => <Loaded itemTypeConfig={itemTypeConfig} item={item} />)
        .with({ state: "ERROR" }, ({ message }) => <Error message={message} />)
        .exhaustive();
};

const Loading = () => {
    return (
        <Container>Loading...</Container>
    );
};

const Loaded = <T extends IItemTypeConfig>(props: { itemTypeConfig: T; item: GetItemEditingType<T>; }) => {
    const navigate = useNavigate();
    const showNotification = useNotifications(); 

    const [editedFields, setEditedFields] = useState<Partial<GetItemEditingType<T>>>({});
   
    const del = async () => {
        try {
            await deleteItem(props.itemTypeConfig, props.item.id);
            
            showNotification({ type: "success", message: ITEM_DELETED(props.itemTypeConfig.name[0]) });
            navigate(`/content/${itemTypePluralName}`);
        } catch (e: any) {
            showNotification({ type: "error", message: e.message });
        }
    }

    const reset = () => {
        setEditedFields({});
    };

    const save = async () => {
        try {
            await updateItem(props.itemTypeConfig, props.item.id, editedFields);

            showNotification({ type: "success", message: ITEM_UPDATED(props.itemTypeConfig.name[0]) });
        } catch (e: any) {
            showNotification({ type: "error", message: e.message });
        }
    };

    const changeField = <P extends keyof GetItemEditingType<T>>(prop: P) => (value: GetItemEditingType<T>[P]) => {
        setEditedFields({
            ...editedFields,
            [prop]: value,
        });
    };

    const itemTypePluralName = props.itemTypeConfig.name[1];
    const label = props.itemTypeConfig.getLabel(props.item);
    const inputs = props.itemTypeConfig.getEditorInputs();
    const hasChanges = Object.keys(editedFields).length;

    return (
        <Container>
            <Header>
                <Breadcrumb crumbs={[
                    { urlSegment: "content", label: "content" },
                    { urlSegment: itemTypePluralName, label: itemTypePluralName },
                    { label: label  },
                ]}/>

                <DangerousButton onClick={del}>{BUTTON_DELETE}</DangerousButton>
                <SecondaryButton onClick={reset} disabled={!hasChanges}>{BUTTON_RESET}</SecondaryButton>
                <PrimaryButton onClick={save} disabled={!hasChanges}>{BUTTON_UPDATE}</PrimaryButton>
            </Header>
            
            <Main>
                <Fields>
                    {mapObject<keyof GetItemEditingType<T>, PropEditor<any>>(inputs, ([prop, Input]) => {
                        if (!Input) {
                            return null;
                        }

                        const value = (editedFields[prop] !== undefined) ? editedFields[prop] : props.item[prop];
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
