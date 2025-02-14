// App.tsx
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "../app/store/store";
import { DashboardLayout } from "../widgets/Sidebar/SideBar";
import AddAdvertisementPage from "../pages/AddAdvertisementPage/AddAdvertisementPage";
import { AdvertisementPage } from "../pages/AddvertisementsPage/AdvertisementsPage";
import { AdvertisementItemPage } from "../pages/AdvertisementItemPage/ui/AdvertisementItemPage";
// Создаем экземпляр QueryClient для react-query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <DashboardLayout>
            <Routes>
              <Route path="/list" element={<AdvertisementPage />} />
              <Route path="/form" element={<AddAdvertisementPage />} />
              <Route path="/form/:id?" element={<AddAdvertisementPage />} />
              <Route path="/item/:id" element={<AdvertisementItemPage />} />
            </Routes>
          </DashboardLayout>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
