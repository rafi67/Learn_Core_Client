import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import App from "../App";
import Class from "../Pages/Class/Class";

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
            }
        ],
    },
    {
        path:'/helloWorld',
        element: <h2>Hello World</h2>
    }
]);

export default router;