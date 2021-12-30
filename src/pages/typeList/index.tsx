import { Link } from "react-router-dom";
import { match } from "ts-pattern";
import { Breadcrumb } from "../../components/breadcrumb";
import { PrimaryButton } from "../../components/button";
import { ErrorDisplay } from "../../components/errorDisplay";
import { CREATE_NEW_ITEM } from "../../messages";
import { ICustomTypeConfig } from "../../types/customType";
import { Header } from "../pageStyles";
import { Container, List, Main } from "./styles";
import { useLoadCustomTypeItems } from "./useLoadCustomTypeItems";

export const TypeList = () => {
    const state = useLoadCustomTypeItems();

    return match(state)
        .with({ state: "LOADING" }, () => <LoadingTypeList />)
        .with({ state: "LOADED" }, ({ typeConfig, items }) => <LoadedTypeList typeConfig={typeConfig} items={items} />)
        .with({ state: "ERROR" }, ({ message }) => <ErrorTypeList message={message} />)
        .exhaustive();
};

const LoadingTypeList = () => {
    return (
        <Container>Loading...</Container>
    );
};

const LoadedTypeList = (props: { typeConfig: ICustomTypeConfig<any>; items: any[]; }) => {
    return (
        <Container>
            <Header>
                <Breadcrumb crumbs={[
                    { label: props.typeConfig.pluralName },
                ]}/>

                <PrimaryButton>{CREATE_NEW_ITEM}</PrimaryButton>
            </Header>

            <Main>
                <List>
                    {props.items.map(item => <Link key={item.id} to={item.id}>{props.typeConfig.getLabel(item)}</Link>)}
                </List>
            </Main>
        </Container>
    );
};

const ErrorTypeList = (props: { message: string; }) => (
    <Container>
        <ErrorDisplay message={props.message} />
    </Container>
);
