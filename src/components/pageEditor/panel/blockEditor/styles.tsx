import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const BlockName = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

export const Label = styled.label`
    display: block;

    font-weight: bold;

    > * {
        display: block;

        width: 100%;
        margin-top: 8px;
        box-sizing: border-box;
    }
`;
