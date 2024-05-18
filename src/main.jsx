import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root/Root.jsx";
import ErrorPage from "./routes/ErrorPage/ErrorPage.jsx";
import LoginPage from "./routes/LoginPage/LoginPage.jsx";
import HomePage from "./routes/HomePage/HomePage.jsx";
import homePageLoader from "./routes/HomePage/HomePage.loader.jsx";
import PostPage from "./routes/PostPage/PostPage.jsx";
import postLoader from "./routes/PostPage/PostPage.loader.jsx"

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: homePageLoader,
      },
      {
        path: "posts/:postId",
        element: <PostPage />,
        loader: postLoader,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
