import { Link } from "react-router-dom";
import { match } from "ts-pattern";
import { Breadcrumb } from "../../components/breadcrumb";
import { ErrorDisplay } from "../../components/errorDisplay";
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
            </Header>

            <Main>
                <List>
                    {props.items.map(item => {
                        const link = `/${props.typeConfig.pluralName}/${item.id}`;

                        return <Link key={item.id} to={link}>{props.typeConfig.getLabel(item)}</Link>
                    })}
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
