import styled from "styled-components";
import { NAV } from "../../theme/colors";

export const Container = styled.div`
    padding: 32px;

    background: ${NAV};
`;
    
export const Nav = styled.nav`
    display: grid;

    > a {
        text-transform: capitalize;
    }
`;
