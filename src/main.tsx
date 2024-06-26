import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root/Root";
import ErrorPage from "./routes/ErrorPage/ErrorPage";
import LoginPage from "./routes/LoginPage/LoginPage";
import HomePage from "./routes/HomePage/HomePage";
import homePageLoader from "./routes/HomePage/HomePage.loader";
import PostPage from "./routes/PostPage/PostPage";
import postLoader from "./routes/PostPage/PostPage.loader";

import "./index.css";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs";

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
