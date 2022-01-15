import styled, { keyframes } from "styled-components";
import { DANGEROUS, SUCCESS, PRIMARY_FG } from "../../../theme/colors";

const slideIn = keyframes`
    from { transform: translate(100%); }
    to { transform: translate(0%); }
`;

export const GUTTER_SIZE = 8;

export const OuterContainer = styled.div`
    animation: ${slideIn} .2s both;

    transition: all .2s ease-in-out;
`;

export const InnerContainer = styled.div<{ type: "success" | "error" }>`
    margin-bottom: ${GUTTER_SIZE}px;
    padding: 16px;

    color: ${PRIMARY_FG};
    background: ${props => props.type === "success" ? SUCCESS : DANGEROUS};
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 18%) 0px 3px 8px;

    cursor: pointer;
`;
