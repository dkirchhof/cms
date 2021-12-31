import { Link } from "react-router-dom";
import { match } from "ts-pattern";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton } from "../../components/button";
import { ErrorDisplay } from "../../components/errorDisplay";
import { CREATE_NEW_ITEM } from "../../messages";
import { ICustomType, ICustomTypeConfig } from "../../types/customType";
import { Header } from "../pageStyles";
import { Container, List, Main } from "./styles";
import { useLoadItemsOfType } from "./useLoadItemsOfType";

export const ItemsOfTypeList = <T extends any>() => {
    const state = useLoadItemsOfType<T>();

    return match(state)
        .with({ state: "LOADING" }, () => <Loading />)
        .with({ state: "LOADED" }, ({ typeName, typeConfig, items }) => <Loaded typeName={typeName} typeConfig={typeConfig} items={items} />)
        .with({ state: "ERROR" }, ({ message }) => <Error message={message} />)
        .exhaustive();
};

const Loading = () => {
    return (
        <Container>Loading...</Container>
    );
};

const Loaded = <T extends any>(props: { typeName: string; typeConfig: ICustomTypeConfig<T>; items: ICustomType<T>[]; }) => {
    return (
        <Container>
            <Header>
                <Breadcrumb crumbs={[
                    { label: props.typeName },
                ]}/>

                <PrimaryButton>{CREATE_NEW_ITEM}</PrimaryButton>
            </Header>

            <Main>
                <List>
                    {props.items.map(item => <Link key={item.id} to={item.id}>{props.typeConfig.getLabel(item.data)}</Link>)}
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
