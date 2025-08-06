import { createBrowserRouter } from "react-router";
import App from "../App";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path:'/helloWorld',
        element: <h2>Hello World</h2>
    }
]);

export default router;