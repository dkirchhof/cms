import styled from "styled-components";
import { BACKDROP, BACKGROUND } from "../../../../theme/colors";

export const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    z-index: 2000;

    display: flex;
    justify-content: center;
    align-items: center;

    background: ${BACKDROP};
`;

export const Container = styled.div`
    width: 256px;
    max-height: 512px;

    display: flex;
    flex-direction: column;
    padding: 16px;

    background: ${BACKGROUND};
    border-radius: 4px;
`;

export const List = styled.div`
    display: flex;
    flex-direction: column;
    /* padding-right: 8px; */
    gap: 8px;

    overflow-y: auto;

    margin-bottom: 8px;
`;
