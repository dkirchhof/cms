import { Link } from "react-router-dom";
import { match } from "ts-pattern";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton } from "../../components/button";
import { ErrorDisplay } from "../../components/errorDisplay";
import { CREATE_NEW_ITEM } from "../../messages";
import { IItem } from "../../types/item";
import { IItemTypeConfig, ItemTypeConfigs } from "../../types/itemType";
import { Header } from "../pageStyles";
import { Container, List, Main } from "./styles";
import { useLoadItemsOfType } from "./useLoadItemsOfType";

export const itemsOfTypeListFactory = (itemTypeConfigs: ItemTypeConfigs) => <T extends IItem>() => {
    const state = useLoadItemsOfType<T>(itemTypeConfigs);

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

const Loaded = <T extends IItem>(props: { itemTypeConfig: IItemTypeConfig<T>; items: T[]; }) => {
    const itemTypeSingularName = props.itemTypeConfig.name[0];
    const itemTypePluralName = props.itemTypeConfig.name[1];

    return (
        <Container>
            <Header>
                <Breadcrumb crumbs={[
                    { label: itemTypePluralName },
                ]}/>

                <PrimaryButton>{CREATE_NEW_ITEM(itemTypeSingularName)}</PrimaryButton>
            </Header>

            <Main>
                <List>
                    {props.items.map(item => <Link key={item.id} to={item.id}>{props.itemTypeConfig.getLabel(item)}</Link>)}
                </List>
            </Main>
        </Container>
    );
};

const Error = (props: { message: string; }) => (
    <Container>
        <ErrorDisplay message={props.message} />
    </Container>
);
