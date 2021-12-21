import styled from "styled-components"

export const ColumnsContainer = styled.div<{ gap: number; }>`
    display: flex;
    gap: ${props => props.gap}px;
`;
