import { render } from "react-dom";
import { PageEditor } from "./components/pageEditor";
import { Sidebar } from "./components/sidebar";
import { GlobalStyles } from "./styles";

const App = () => {
    return (
        <>
            <GlobalStyles />

            <Sidebar />
            <PageEditor /> 
        </>       
    );
};

render(<App />, document.getElementById("app"));
