import styled from "styled-components";
import { GRAY_250 } from "../../theme/colors";

export const Container = styled.div`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 100;

    display: grid;
    grid-template-rows: auto 1fr;

    background: ${GRAY_250};
    border-radius: 4px;
`;

export const Name = styled.span`
    text-transform: uppercase;
`;

export const Main = styled.main`
    display: grid;
    grid-template-columns: 1fr 256px 384px;
    gap: 16px;

    padding: 32px;
    overflow: hidden;

    /* scrollable container fix */
    /* min-height: 0; */
`;
