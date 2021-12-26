import styled from "styled-components";
import { BORDER, PRIMARY } from "../../../../../theme/colors";

export const Tile = styled.div<{ selected: boolean; }>`
    padding: 16px;

    background: white;
    border-radius: 4px;

    cursor: pointer;

    color: ${props => props.selected ? PRIMARY : "inherit"};
    border: 1px solid ${props => props.selected ? PRIMARY : BORDER};
`;

export const BlockName = styled.div`
    font-weight: bold;
`;

export const BlockLabel = styled.div`
    margin-top: 8px;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    font-size: 14px;
`;

export const ChildList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    margin: 8px 0px 0px 8px;
`;
