import { Link, Navigate } from "react-router-dom";
import { match } from "ts-pattern";
import { ICustomTypeConfig } from "../../types/customType";
import { Container, Heading } from "./styles";
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
            <Heading>{props.typeConfig.pluralName}</Heading>

            <div>{props.items.map(item => {
                const link = `/${props.typeConfig.pluralName}/${item.id}`;

                return <Link key={item.id} to={link}>{props.typeConfig.getLabel(item)}</Link>
            })}</div>
        </Container>
    );
};

const ErrorTypeList = (props: { message: string; }) => {
    return (
        <Navigate to="/404" replace />
    );
};
