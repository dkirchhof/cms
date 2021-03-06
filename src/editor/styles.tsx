import styled, { createGlobalStyle } from "styled-components";
import { GRAY_250 } from "./theme/colors";

export const GlobalStyles = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;

        font-family: sans-serif;
    }
`;

export const Container = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;

    height: 100vh;
    
    background: ${GRAY_250};
`;
