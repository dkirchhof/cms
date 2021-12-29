import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    position: relative;
    padding: 32px;
`;

export const Heading = styled.h2`
    margin-top: 0;

    text-transform: capitalize;
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
