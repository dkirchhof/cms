import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { match } from "ts-pattern";
import { GetItemType, IItem, IItemTypeConfig, ItemTypeConfigs } from "../../../types/itemTypeConfig";
import { deleteItem } from "../../api";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton } from "../../components/button";
import { useContextMenu } from "../../components/contextMenu";
import { ErrorDisplay } from "../../components/errorDisplay";
import { useNotifications } from "../../components/notifications";
import { CREATE_NEW_ITEM, CTX_MENU_DELETE, CTX_MENU_EDIT, ITEM_DELETED } from "../../messages";
import { Header } from "../pageStyles";
import { Container, Main, Table } from "./styles";
import { useLoadItemsOfType } from "./useLoadItemsOfType";

export const itemsOfTypeListFactory = (itemTypeConfigs: ItemTypeConfigs) => () => {
    const state = useLoadItemsOfType(itemTypeConfigs);

    return match(state)
        .with({ state: "LOADING" }, () => <Loading />)
        .with({ state: "LOADED" }, ({ itemTypeConfig, items }) => <Loaded itemTypeConfig={itemTypeConfig} items={items} />)
        .with({ state: "ERROR" }, ({ message }) => <Error message={message} />)
        .exhaustive();
};

const Loading = () => {
    return (
        <Container>Loading...</Container>
    );
};

const Loaded = <T extends IItemTypeConfig>(props: { itemTypeConfig: T; items: GetItemType<T>[]; }) => {
    const navigate = useNavigate();
    const showNotification = useNotifications();

    const [items, setItems] = useState(props.items);

    const editItem = (itemId: string) => {
        navigate(itemId);
    };

    const delItem = async (itemId: string) => {
        try {
            await deleteItem(props.itemTypeConfig, itemId);

            setItems(items.filter(item => item.id !== itemId));

            showNotification({ type: "success", message: ITEM_DELETED(props.itemTypeConfig.name[0]) });
        } catch (e: any) {
            showNotification({ type: "error", message: e.message });
        }
    };

    const itemTypeSingularName = props.itemTypeConfig.name[0];
    const itemTypePluralName = props.itemTypeConfig.name[1];
    const listProps = props.itemTypeConfig.listProps;

    return (
        <Container>
            <Header>
                <Breadcrumb crumbs={[
                    { urlSegment: "content", label: "content" },
                    { label: itemTypePluralName },
                ]} />

                <PrimaryButton>{CREATE_NEW_ITEM(itemTypeSingularName)}</PrimaryButton>
            </Header>

            <Main>
                <Table>
                    <thead>
                        <tr>
                            {listProps.map(prop => <th key={prop.toString()}>{prop}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item =>
                            <Item 
                                key={item.id}
                                listProps={listProps} 
                                item={item} 
                                editItem={editItem}
                                delItem={delItem}
                            />
                        )}
                    </tbody>
                </Table>
            </Main>
        </Container>
    );
};

const Error = (props: { message: string; }) => (
    <Container>
        <ErrorDisplay message={props.message} />
    </Container>
);

interface IItemProps<T extends IItem> {
    listProps: (keyof T)[];
    item: T;

    editItem: (itemId: string) => void;
    delItem: (itemId: string) => void;
}

const Item = <T extends IItem>(props: IItemProps<T>) => {
    const { ContextMenu, openContextMenu } = useContextMenu([
        { label: CTX_MENU_EDIT, action: () => props.editItem(props.item.id) },
        { label: CTX_MENU_DELETE, action: () => props.delItem(props.item.id) },
    ]);

    return (
        <tr onClick={() => props.editItem(props.item.id)} onContextMenu={openContextMenu}>
            {props.listProps.map(prop => <td key={prop.toString()}>{props.item[prop]}</td>)}

            <ContextMenu />
        </tr>
    );
};
