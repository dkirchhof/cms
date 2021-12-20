import { createGlobalStyle } from "styled-components";
import { GRAY_245, GRAY_250 } from "./theme/colors";

export const GlobalStyles = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;

        font-family: sans-serif;
    }

    #app {
        display: grid;
        grid-template-columns: 1fr 256px 384px;

        height: 100vh;

        > div:nth-child(2) {
            background: ${GRAY_250};
        }

        > div:nth-child(3) {
            background: ${GRAY_245};
        }
    }
`;
