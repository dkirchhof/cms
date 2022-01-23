import { HashRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { entityListFactory } from "./pages/entityList";
import { itemEditorFactory } from "./pages/itemEditor";
import { typesListFactory } from "./pages/typesList";
import { Container, GlobalStyles } from "./styles";
import { ItemTypeConfigs } from "../types/itemTypeConfig";
import { NotificationsProvider } from "./components/notifications";

export const editorFactory = (itemTypeConfigs: ItemTypeConfigs) => {
    const TypesList = typesListFactory(itemTypeConfigs);
    const EntityList = entityListFactory(itemTypeConfigs);
    const ItemEditor = itemEditorFactory(itemTypeConfigs);

    return () => {
        return (
            <NotificationsProvider>
                <Container>
                    <GlobalStyles />

                    <HashRouter>
                        <Header />

                        <Routes>
                            <Route path="/" element={<div>Home</div>} />

                            <Route path="/content" element={<TypesList />} />
                            <Route path="/content/:typeName" element={<EntityList />} />
                            <Route path="/content/:typeName/:id" element={<ItemEditor />} />

                            <Route path="/404" element={<div>404</div>} />
                            <Route path="*" element={<div>404</div>} />
                        </Routes>
                    </HashRouter>
                </Container>
            </NotificationsProvider>
        );
    };
};
