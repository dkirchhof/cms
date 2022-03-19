import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { match } from "ts-pattern";
import { IItemTypeConfigForList } from "../../../itemTypeBuilder";
import { IListItem } from "../../../itemTypeBuilder/listField";
import { findItemConfigByName } from "../../../utils/findItemTypeConfig";
import { deleteItem, getList } from "../../api";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton, SecondaryButton } from "../../components/button";
import { useContextMenu } from "../../components/contextMenu";
import { ErrorDisplay } from "../../components/errorDisplay";
import { useNotifications } from "../../components/notifications";
import { CREATE_NEW_ITEM, CTX_MENU_DELETE, CTX_MENU_EDIT, ITEM_DELETED } from "../../messages";
import { Header } from "../pageStyles";
import { Container, Main, Pagination, Table } from "./styles";

const PAGE_SIZE = 3;

const getIntParam = (searchParams: URLSearchParams, name: string) => {
    const param = searchParams.get(name);

    if (param) {
        return parseInt(param);
    }

    return null;
};

interface IState {
    itemTypeConfig: IItemTypeConfigForList<any>;
    items: IListItem<any>[];
    itemsCount: number;
    page: number;
    pageCount: number;
}

export const entityListFactory = (itemTypeConfigs: IItemTypeConfigForList<any>[]) => () => {
    const { typeName } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const showNotification = useNotifications();

    const [state, setState] = useState<IState | null>(null);

    const fetchItems = async (typeName: string, searchParams: URLSearchParams) => {
        const page = getIntParam(searchParams, "page") || 1;

        const itemTypeConfig = findItemConfigByName(itemTypeConfigs, typeName);

        if (!itemTypeConfig) {
            throw new Error("Couldn't find TypeConfig.");
        }

        const result = await getList(itemTypeConfig, page, PAGE_SIZE);

        setState({
            itemTypeConfig,
            items: result.items,
            itemsCount: result.count,
            page,
            pageCount: Math.ceil(result.count / PAGE_SIZE),
        });
    };

    useEffect(() => {
        fetchItems(typeName!, searchParams);
    }, [typeName, searchParams]);


    if (!state) {
        return <div>Loading...</div>;
    }

    const createItem = () => {
        navigate("new");
    };

    const editItem = (itemId: string) => {
        navigate(itemId);
    };

    const delItem = async (itemId: string) => {
        // try {
        //     await deleteItem(props.itemTypeConfig, itemId);

        //     setItems(items.filter(item => item.id !== itemId));

        //     showNotification({ type: "success", message: ITEM_DELETED(props.itemTypeConfig.name[0]) });
        // } catch (e: any) {
        //     showNotification({ type: "error", message: e.message });
        // }
    };

    const onGotoFirstPageClick = () => {
        setSearchParams({ page: "0" });
    };

    const onGotoPreviousPageClick = () => {
        setSearchParams({ page: (state.page - 1).toString() });
    };

    const onGotoNextPageClick = () => {
        setSearchParams({ page: (state.page + 1).toString() });
    };

    const onGotoLastPageClick = () => {
        setSearchParams({ page: state.pageCount.toString() });
    };

    const itemTypeSingularName = state.itemTypeConfig.name[0];
    const itemTypePluralName = state.itemTypeConfig.name[1];
    const listProps = state.itemTypeConfig.listType.listProps;

    const isFirstPage = state.page === 1;
    const isLastPage = state.page === state.pageCount;

    return (
        <Container>
            <Header>
                <Breadcrumb crumbs={[
                    { urlSegment: "content", label: "content" },
                    { label: itemTypePluralName },
                ]} />

                <PrimaryButton onClick={createItem}>{CREATE_NEW_ITEM(itemTypeSingularName)}</PrimaryButton>
            </Header>

            <Main>
                <Table>
                    <thead>
                        <tr>
                            {listProps.map(prop => <th key={prop.toString()}>{prop}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {state.items.map(item =>
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

                <Pagination>
                    <button onClick={onGotoFirstPageClick} disabled={isFirstPage}>
                        <svg viewBox="0 0 32 32">
                            <path d="m14 16 6 5.5v-11zM10 10.5h2v11h-2z" />
                        </svg>
                    </button>
                    <button onClick={onGotoPreviousPageClick} disabled={isFirstPage}>
                        <svg viewBox="0 0 32 32">
                            <path d="m12 16 6 5.5v-11z" />
                        </svg>
                    </button>

                    <span>{state.page} / {state.pageCount}</span>

                    <button onClick={onGotoNextPageClick} disabled={isLastPage}>
                        <svg viewBox="0 0 32 32">
                            <path d="m20 16-6 5.5v-11z" />
                        </svg>
                    </button>
                    <button onClick={onGotoLastPageClick} disabled={isLastPage}>
                        <svg viewBox="0 0 32 32">
                            <path d="m18 16-6 5.5v-11zM20 10.5h2v11h-2z" />
                        </svg>
                    </button>
                </Pagination>
            </Main>
        </Container>
    );
};

interface IItemProps<LIST_PROPS extends string> {
    listProps: readonly LIST_PROPS[];
    item: IListItem<LIST_PROPS>;

    editItem: (itemId: string) => void;
    delItem: (itemId: string) => void;
}

const Item = <LIST_PROPS extends string>(props: IItemProps<LIST_PROPS>) => {
    const { ContextMenu, openContextMenu } = useContextMenu([
        [
            { label: CTX_MENU_EDIT, action: () => props.editItem(props.item.id) },
            { label: CTX_MENU_DELETE, action: () => props.delItem(props.item.id) },
        ],
    ]);

    return (
        <tr onClick={() => props.editItem(props.item.id)} onContextMenu={openContextMenu}>
            {props.listProps.map(prop => <td key={prop.toString()}>{props.item[prop]}</td>)}

            <ContextMenu />
        </tr>
    );
};
