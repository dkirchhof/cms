import { useNavigate } from "react-router-dom";
import { match } from "ts-pattern";
import { GetItemType, IItemTypeConfig, ItemTypeConfigs } from "../../../shared/types/itemTypeConfig";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton } from "../../components/button";
import { ErrorDisplay } from "../../components/errorDisplay";
import { CREATE_NEW_ITEM } from "../../messages";
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
                <Table>
                    <thead>
                        <tr>
                            {props.itemTypeConfig.listProps.map(prop => 
                                <th key={prop.toString()}>{prop}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map(item => 
                            <Item key={item.id} props={props.itemTypeConfig.listProps} item={item} onClick={() => navigate(item.id)} />
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

const Item = <T extends any>(props: { props: (keyof T)[]; item: T; onClick: () => void; }) => (
    <tr onClick={props.onClick}>
        {props.props.map(prop => 
            <td key={prop.toString()}>{props.item[prop]}</td>
        )}
    </tr>
);
