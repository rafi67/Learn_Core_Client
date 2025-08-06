import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import App from "../App";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <Home/>
            }
        ],
    },
    {
        path:'/helloWorld',
        element: <h2>Hello World</h2>
    }
]);

export default router;