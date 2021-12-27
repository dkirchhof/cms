import { render } from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { TypeEditor } from "./components/typeEditor";
import { TypeList } from "./components/typeList";
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

                    {/* {MY_TYPES.map(createTypeRoute)} */}

                    <Route path="/404" element={<div>404</div>} />
                    <Route path="*" element={<div>404</div>} />
                </Routes>
            </HashRouter>

        </>
    );
};

// const createTypeRoute = (type: ICustomTypeConfig<any>) => {
//     const overviewPath = `/${type.pluralName}`;
//     const overviewElement = <TypesList typeConfig={type} />;

//     const detailPath = `${overviewPath}/:id`;
//     const detailElement = <TypeEditor typeConfig={type} />;

//     return <Route path={path} element={element} />;
// };

render(<App />, document.getElementById("app"));
