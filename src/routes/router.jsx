import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import App from "../App";
import Class from "../Pages/Class/Class";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import ClassDetails from "../Pages/ClassDetails/ClassDetails";
import PrivateRoute from "./PrivateRoute";
import StudentRoute from "./StudentRoute";
import TeacherRoute from "./TeacherRoute";
import Dashboard from "../Layout/Dashboard";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import MyEnrollClasses from "../Pages/MyEnrollClasses/MyEnrollClasses";
import MyEnrollClassDetails from "../Pages/MyEnrollClassDetails/MyEnrollClassDetails";
import Profile from "../Pages/Profile/Profile";
import AdminRoute from "./AdminRoute";
import TeacherRequest from "../Pages/TeacherRequest/TeacherRequest";
import TeachOnLearnCore from "../Pages/TeachOnLearnCore/TeachOnLearnCore";
import Users from "../Pages/Users/Users";
import AllClasses from "../Pages/AllClasses/AllClasses";
import AddClass from "../Pages/AddClass/AddClass";
import MyClass from "../Pages/MyClass/MyClass";
import MyClassDetails from "../Pages/MyClassDetails/MyClassDetails";
import MyOrder from "../Pages/MyOrder/MyOrder";
import SSLCOMPaymentSuccess from "../Pages/SSLCOMPaymentSuccess/SSLCOMPaymentSuccess";
import PaymentCancel from "../Pages/PaymentCancel/PaymentCancel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
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
      {
        path: "teachOnLearnCore",
        element: (
          <PrivateRoute>
            <TeachOnLearnCore />
          </PrivateRoute>
        ),
      },
      {
        path: "success-payment",
        element: (
          <PrivateRoute>
            <SSLCOMPaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "cancel",
        element: (
          <PrivateRoute>
            <PaymentCancel />
          </PrivateRoute>
        ),
      },
      {
        path: "fail",
        element: (
          <PrivateRoute>
            <PaymentCancel />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "studentDashboard",
    element: (
      <StudentRoute>
        <Dashboard />
      </StudentRoute>
    ),
    children: [
      {
        path: "myEnrollClass",
        element: <MyEnrollClasses />,
      },
      {
        path: "enrollClassDetails/:id",
        element: <MyEnrollClassDetails />,
      },
      {
        path: "studentProfile",
        element: <Profile />,
      },
      {
        path: "myOrder",
        element: <MyOrder />,
      },
    ],
  },
  {
    path: "adminDashBoard",
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        path: "adminProfile",
        element: <Profile />,
      },
      {
        path: "teacherRequest",
        element: <TeacherRequest />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "allClasses",
        element: <AllClasses />,
      },
      {
        path: "myClassDetails/:id",
        element: <MyClassDetails />,
      },
    ],
  },
  {
    path: "teacherDashboard",
    element: (
      <TeacherRoute>
        <Dashboard />
      </TeacherRoute>
    ),
    children: [
      {
        path: "addClass",
        element: <AddClass />,
      },
      {
        path: "teacherProfile",
        element: <Profile />,
      },
      {
        path: "myClass",
        element: <MyClass />,
      },
      {
        path: "myClassDetails/:id",
        element: <MyClassDetails />,
      },
    ],
  },
]);

export default router;
