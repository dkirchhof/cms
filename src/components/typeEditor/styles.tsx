import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    padding: 32px;
`;

export const Name = styled.div`
    font-size: 20px;
    font-weight: bold;

    text-transform: capitalize;
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
