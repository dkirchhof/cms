import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 256px 384px;
    gap: 16px;

    height: 100%;
    overflow: hidden;

    /* scrollable container fix */
    /* min-height: 0; */
`;
