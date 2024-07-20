/* eslint-disable @typescript-eslint/no-explicit-any */

import "./styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";

import App from "./App.tsx";
import { Root, Posts, Post } from "./routes";
import { postsListLoader } from "./routes/posts/utils.ts";
import { postLoader } from "./routes/post/loader.ts";

/* HashRoute because GitHub Pages */
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    handle: { crumb: () => <span>Home</span> },
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/posts",
        element: <Posts />,
        loader: postsListLoader,
        handle: { crumb: () => <span>Posts</span> },
        children: [
          {
            path: "/posts/:post",
            element: <Post />,
            loader: postLoader,
            handle: { crumb: (data: any) => <span>Post: {data.postId}</span> },
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
