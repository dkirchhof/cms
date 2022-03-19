import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { match } from "ts-pattern";
import { IItemTypeForList } from "../../../itemTypeBuilder";
import { IListItem } from "../../../itemTypeBuilder/listField";
import { createApi } from "../../api";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton } from "../../components/button";
import { ErrorDisplay } from "../../components/errorDisplay";
import { useNotifications } from "../../components/notifications";
import { CREATE_NEW_ITEM, ITEM_DELETED } from "../../messages";
import { Header } from "../pageStyles";
import { ListItem } from "./listItem";
import { Container, Main, Pagination, Table } from "./styles";
import { useLoadItemType } from "./useLoadItemType";

const PAGE_SIZE = 10;

const getIntParam = (searchParams: URLSearchParams, name: string, defaultValue: number) => {
    const param = searchParams.get(name);

    if (param) {
        return parseInt(param);
    }

    return defaultValue;
};

interface IState {
    items: IListItem<any>[];
    itemsCount: number;
    page: number;
    pageCount: number;
}

export const itemTypeItemListFactory = (itemTypes: IItemTypeForList<any>[]) => () => {
    const state = useLoadItemType(itemTypes);

    return match(state)
        .with({ state: "LOADING" }, () => <Loading />)
        .with({ state: "LOADED" }, ({ itemType }) => <Loaded itemType={itemType} />)
        .with({ state: "ERROR" }, ({ message }) => <Error message={message} />)
        .exhaustive();
};

const Loading = () => {
    return (
        <Container>Loading...</Container>
    );
};

const Error = (props: { message: string; }) => (
    <Container>
        <ErrorDisplay message={props.message} />
    </Container>
);

const Loaded = (props: { itemType: IItemTypeForList<any>; }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const showNotification = useNotifications();

    const [state, setState] = useState<IState>({ items: [], page: 1, pageCount: 1, itemsCount: 0 });

    const fetchItems = async (searchParams: URLSearchParams) => {
        const page = getIntParam(searchParams, "page", 1);

        const result = await createApi(props.itemType).getList(page, PAGE_SIZE);

        setState({
            items: result.items,
            itemsCount: result.count,
            page,
            pageCount: Math.ceil(result.count / PAGE_SIZE),
        });
    };

    useEffect(() => {
        fetchItems(searchParams);
    }, [searchParams]);


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
        try {
            await createApi(props.itemType).deleteItem(itemId);
            
            showNotification({ type: "success", message: ITEM_DELETED(props.itemType.name[0]) });
            fetchItems(searchParams);
        } catch (e: any) {
            showNotification({ type: "error", message: e.message });
        }
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

    const itemTypeSingularName = props.itemType.name[0];
    const itemTypePluralName = props.itemType.name[1];
    const listProps = props.itemType.listType.listProps;

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
                            <ListItem
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
