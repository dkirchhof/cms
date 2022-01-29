import styled from "styled-components";
import { NAV, NAV_FG, PRIMARY } from "../../theme/colors";

export const Container = styled.div`
    padding: 16px 32px;

    background: ${NAV};
`;
    
export const Nav = styled.nav`
    display: flex;
    gap: 16px;

    > a {
        color: ${NAV_FG};

        font-size: 14px;
        text-transform: uppercase;
        text-decoration: none;

        &.active {
            color: ${PRIMARY};
        }
    }
`;
