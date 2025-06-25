import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import routeTitles from "../router/routeTitle";

const RootLayout = () => {
    const TitleManager = () => {
        const location = useLocation();

        useEffect(() => {
            const title = routeTitles[location.pathname] || "My Site";
            document.title = title;
        }, [location.pathname]);

        return null;
    };
    return (
        <div>
            <TitleManager />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;
