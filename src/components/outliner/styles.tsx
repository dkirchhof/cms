import styled from "styled-components";
import { BORDER, GRAY_250, PRIMARY, PRIMARY_FG } from "../../theme/colors";

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const Container = styled(List)`
    padding: 16px;

    background: ${GRAY_250};
`;

export const ItemContainer = styled.div`
`;

export const Tile = styled.div`
    padding: 16px;

    background: white;
    border-radius: 4px;

    cursor: pointer;

    color: ${props => props["aria-selected"] ? PRIMARY : "inherit"};
    border: 1px solid ${props => props["aria-selected"] ? PRIMARY : BORDER};

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

export const ChildList = styled(List)`
    margin: 8px 0px 0px 8px;
`;
