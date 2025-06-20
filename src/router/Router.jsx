import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import CourseDetails from "../pages/CourseDetails";
import AddCourse from "../pages/AddCourse";
import MyEnrollments from "../pages/MyEnrollments";
import Instructors from "../pages/Instructors";

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
            {
                path: "/add-course",
                element: <AddCourse />,
            },
            {
                path: "/my-enrollments",
                element: <MyEnrollments></MyEnrollments>
            },
            {
                path: "/instructors",
                element: <Instructors />,
            },
            {
                path:"*",
                element: <div className="text-center text-2xl">404 - Page Not Found</div>,
            }
        ],
    },
]);

export default router;
