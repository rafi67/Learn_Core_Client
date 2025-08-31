import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import App from "../App";
import Class from "../Pages/Class/Class";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import ClassDetails from "../Pages/ClassDetails/ClassDetails";
import PrivateRoute from "./PrivateRoute";
import StudentRoute from "./StudentRoute";
import Dashboard from "../Layout/Dashboard";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import MyEnrollClasses from "../Pages/MyEnrollClasses/MyEnrollClasses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound/>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "class",
        element: <Class />,
      },
      {
        path: "signIn",
        element: <SignIn />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "classDetails/:id",
        element: (
          <PrivateRoute>
            <ClassDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "studentDashboard",
    element: (
      <StudentRoute>
        <Dashboard/>
      </StudentRoute>
    ),
    children: [
      {
        path: 'myEnrollClass',
        element: <MyEnrollClasses/>
      }
    ],
  },
]);

export default router;
