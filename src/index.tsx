import { render } from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { TypeEditor } from "./components/typeEditor";
import { TypeList } from "./components/typeList";
import { VisualEditor } from "./components/visualEditor";
import { GlobalStyles } from "./styles";

const App = () => {
    return (
        <>
            <GlobalStyles />

            <HashRouter>
                <Sidebar />

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
