import { render } from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { ItemsOfTypeList } from "./pages/itemsOfTypeList";
import { ItemEditor } from "./pages/itemEditor";
import { TypesList } from "./pages/typesList";
import { VisualBlockEditor } from "./pages/visualBlockEditor";
import { GlobalStyles } from "./styles";

const App = () => {
    return (
        <>
            <GlobalStyles />

            <HashRouter>
                <Header />

                <Routes>
                    <Route path="/" element={<div>Home</div>} />
                    
                    <Route path="/content" element={<TypesList />} />
                    <Route path="/content/:typeName" element={<ItemsOfTypeList />} />
                    <Route path="/content/:typeName/:id" element={<ItemEditor />} />
                    <Route path="/content/:typeName/:id/:prop" element={<VisualBlockEditor />} />

                    <Route path="/404" element={<div>404</div>} />
                    <Route path="*" element={<div>404</div>} />
                </Routes>
            </HashRouter>

        </>
    );
};

render(<App />, document.getElementById("app"));
