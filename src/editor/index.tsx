import { HashRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { itemEditorFactory } from "./pages/itemEditor";
import { typesListFactory } from "./pages/typesList";
import { Container, GlobalStyles } from "./styles";
import { NotificationsProvider } from "./components/notifications";
import { IItemType } from "../itemTypeBuilder";
import { itemTypeItemListFactory } from "./pages/itemTypeItemList";

export const editorFactory = (itemTypes: IItemType[], locales: readonly string[]) => {
    const TypesList = typesListFactory(itemTypes);
    const ItemTypeItemList = itemTypeItemListFactory(itemTypes);
    const ItemEditor = itemEditorFactory(itemTypes, locales);

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
                            <Route path="/content/:typeName" element={<ItemTypeItemList />} />
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
