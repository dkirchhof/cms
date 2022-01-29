import styled from "styled-components";
import { NAV, NAV_FG, NAV_SEPARATOR, PRIMARY, PRIMARY_FG } from "../../theme/colors";

export const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1000;
`;

export const Container = styled.div`
    position: absolute;
    min-width: 128px;

    color: ${NAV_FG};
    background: ${NAV};
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 50px;
`;

export const EntryGroup = styled.div`
    padding: 8px 0px;
    
    :not(:first-child) {
        border-top: 1px solid ${NAV_SEPARATOR};
    }

    > button {
        display: block;
        width: 100%;
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
