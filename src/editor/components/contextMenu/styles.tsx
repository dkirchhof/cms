import styled from "styled-components";
import { NAV, NAV_FG, PRIMARY, PRIMARY_FG } from "../../theme/colors";

export const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1000;
`;

export const Container = styled.div`
    position: absolute;
    min-width: 128px;
    padding: 8px 0px;

    display: flex;
    flex-direction: column;
    gap: 8px;

    color: ${NAV_FG};
    background: ${NAV};
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 50px;

    > button {
        padding: 8px 16px;

        color: inherit;
        background: none;
        border: none;

        cursor: pointer;
        
        text-align: left;
        font: inherit;

        :hover {
            color: ${PRIMARY_FG};
            background: ${PRIMARY};
        }
    }
`;
