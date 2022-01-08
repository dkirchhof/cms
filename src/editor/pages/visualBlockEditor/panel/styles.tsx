import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 256px 384px;
    gap: 16px;

    /* scrollable container fix */
    min-height: 0;
`;
