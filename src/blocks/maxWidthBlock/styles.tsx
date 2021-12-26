import styled from "styled-components";

export const Container = styled.div<{ maxWidth: number; }>`
    max-width: ${props => props.maxWidth}px;
    margin-left: auto;
    margin-right: auto;
    padding: 0px 16px;
`;
