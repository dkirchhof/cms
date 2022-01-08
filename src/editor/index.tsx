import { HashRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { itemsOfTypeListFactory } from "./pages/itemsOfTypeList";
import { itemEditorFactory } from "./pages/itemEditor";
import { typesListFactory } from "./pages/typesList";
import { visualBlockEditorFactory } from "./pages/visualBlockEditor";
import { GlobalStyles } from "./styles";
import { ItemTypeConfigs } from "../shared/types/itemTypeConfig";
import { BlockConfigs } from "./types/block";

export const editorFactory = (itemTypeConfigs: ItemTypeConfigs, blockConfigs: BlockConfigs) => () => {
    const TypesList = typesListFactory(itemTypeConfigs);
    const ItemsOfTypeList = itemsOfTypeListFactory(itemTypeConfigs);
    const ItemEditor = itemEditorFactory(itemTypeConfigs);
    const VisualBlockEditor = visualBlockEditorFactory(itemTypeConfigs, blockConfigs);

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
