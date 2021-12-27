import { createGlobalStyle } from "styled-components";
import { GRAY_250 } from "./theme/colors";

export const GlobalStyles = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;

        font-family: sans-serif;
    }

    #app {
        display: grid;
        grid-template-columns: 256px 1fr;

        height: 100vh;
        
        background: ${GRAY_250};
    }
`;
