import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    position: relative;
    padding: 32px;
`;

export const Header = styled.header`
    display: grid;
    grid-template-columns: 1fr auto auto;
    grid-gap: 16px;
    align-items: center;
`;

export const Label = styled.label`
    display: block;

    font-weight: bold;

    > * {
        display: block;

        margin-top: 8px;
        box-sizing: border-box;
    }

    > input, textarea {
        width: 100%;
    }
`;
