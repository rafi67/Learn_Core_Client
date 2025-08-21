import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import App from "../App";
import Class from "../Pages/Class/Class";
import SignIn from "../Pages/SignIn/SignIn";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: 'class',
                element: <Class/>
            },
            {
                path: 'signIn',
                element: <SignIn/>
            },
        ],
    },
    {
        path:'/helloWorld',
        element: <h2>Hello World</h2>
    }
]);

export default router;