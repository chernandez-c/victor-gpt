import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App isAdmin={false} />,
    },
    {
        path: "/admin",
        element: <App isAdmin={true} />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <div className='container'>
            <RouterProvider router={router} />
        </div>
    </React.StrictMode>
);
