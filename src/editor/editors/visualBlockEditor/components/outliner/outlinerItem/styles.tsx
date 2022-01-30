import styled from "styled-components";
import { BACKGROUND, BORDER, GRAY_245, PRIMARY } from "../../../../../theme/colors";

export const Tile = styled.button<{ selected: boolean; }>`
    width: 100%;
    padding: 16px;

    color: ${props => props.selected ? PRIMARY : "inherit"};
    background: ${BACKGROUND};
    border: 1px solid ${props => props.selected ? PRIMARY : BORDER};
    border-radius: 4px;
    
    font: inherit;
    text-align: left;

    cursor: pointer;

    :hover {
        background: ${GRAY_245};
    }
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
