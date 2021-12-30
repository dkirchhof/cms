import { render } from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { TypeEditor } from "./pages/typeEditor";
import { TypeList } from "./pages/typeList";
import { VisualEditor } from "./pages/visualEditor";
import { GlobalStyles } from "./styles";

const App = () => {
    return (
        <>
            <GlobalStyles />

            <HashRouter>
                <Header />

                <Routes>
                    <Route path="/" element={<div>Home</div>} />
                    
                    <Route path="/:typePluralName" element={<TypeList />} />
                    <Route path="/:typePluralName/:id" element={<TypeEditor />} />
                    <Route path="/:typePluralName/:id/:prop" element={<VisualEditor />} />

                    <Route path="/404" element={<div>404</div>} />
                    <Route path="*" element={<div>404</div>} />
                </Routes>
            </HashRouter>

        </>
    );
};

render(<App />, document.getElementById("app"));
