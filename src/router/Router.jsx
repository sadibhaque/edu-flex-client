import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import CourseDetails from "../pages/CourseDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            { index: true, element: <Home /> },
            {
                path: "/courses",
                element: <Courses></Courses>,
            },
            {
                path: "/courses/:id",
                element: <CourseDetails />,
            },
        ],
    },
]);

export default router;
