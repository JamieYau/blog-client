import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from "./routes/Root.jsx"
import ErrorPage from './routes/ErrorPage.jsx'
import HomePage, { loader as homePageLoader } from "./routes/HomePage.jsx";
import PostPage, { loader as postLoader} from './routes/PostPage.jsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: homePageLoader, // Assign the loader function to the route
      },
      {
        path: "posts/:postId",
        element: <PostPage />,
        loader: postLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
