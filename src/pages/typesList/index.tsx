import { Link } from "react-router-dom";
import { MY_TYPES } from "../../myTypes";
import { Container, List } from "./styles";

export const TypesList = () => {
    return (
        <Container>
            <List>
                {Object.keys(MY_TYPES).map(typeName => <Link key={typeName} to={typeName}>{typeName}</Link>)}
            </List>
        </Container>
    );
};
