import styled from "styled-components";
import { NAV } from "../../theme/colors";

export const Container = styled.div`
    background: ${NAV};
`;
    
export const Nav = styled.nav`
    display: grid;

    > a {
        text-transform: capitalize;
    }
`;
