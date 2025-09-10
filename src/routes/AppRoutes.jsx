import { Route, Routes } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../components/layouts/MainLayout";
import TestAPI from "../components/TestAPI";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Home />}></Route>
                <Route path="/test-api" element={<TestAPI />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;