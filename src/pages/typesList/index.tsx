import { Link } from "react-router-dom";
import { MY_TYPES } from "../../myTypes";
import { Container, List } from "./styles";

export const TypesList = () => {
    return (
        <Container>
            <List>
                {MY_TYPES.map(type => <Link key={type.pluralName} to={type.pluralName}>{type.pluralName}</Link>)}
            </List>
        </Container>
    );
};
