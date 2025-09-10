import { Route, Routes } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../components/layouts/MainLayout";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Home />}></Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;