import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import CourseDetails from "../pages/CourseDetails";
import AddCourse from "../pages/AddCourse";
import MyEnrollments from "../pages/MyEnrollments";
import Instructors from "../pages/Instructors";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import PrivateRoute from "../contexts/PrivateRoute";
import MyCourses from "../pages/MyCourses";
import NotFound from "../pages/NotFound";

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
                loader: ({ params }) =>
                    fetch(
                        `https://eduflex-server.vercel.app/courses/${params.id}`
                    ),
            },
            {
                path: "/add-course",
                element: (
                    <PrivateRoute>
                        <AddCourse />
                    </PrivateRoute>
                ),
            },
            {
                path: "/my-enrollments",
                element: (
                    <PrivateRoute>
                        <MyEnrollments></MyEnrollments>
                    </PrivateRoute>
                ),
            },
            {
                path: "/my-courses",
                element: (
                    <PrivateRoute>
                        <MyCourses></MyCourses>
                    </PrivateRoute>
                ),
            },
            {
                path: "/instructors",
                element: (
                    <PrivateRoute>
                        <Instructors></Instructors>
                    </PrivateRoute>
                ),
            },
            {
                path: "*",
                element: <NotFound />,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
        ],
    },
]);

export default router;
