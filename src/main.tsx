import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { LoaderFunction, RouterProvider, createHashRouter } from 'react-router-dom'
import { Posts, Post } from './routes/posts.tsx'
import Index from './routes/index.tsx'
import { Post as PostObj, PostsList } from './types'

const fetchPosts: LoaderFunction<any> = async (args): Promise<PostsList> => {
  const postId = args.params.post || '';
  const response = await fetch(`/posts.json`).then(res => res.json());
  return { posts: response, postId };
};

const fetchPost: LoaderFunction<any> = async (args): Promise<PostObj> => {
  const postId = args.params.post || '';
  const response = await fetch(`/${postId}.md`).then(res => res.text());
  return { postContent: response, postId};
};

/* HashRoute because GitHub Pages */
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    handle: { crumb: () => <span>Home</span> },
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/posts",
        element: <Posts />,
        loader: fetchPosts,
        handle: { crumb: () => <span>Posts</span> },
        children: [
          {
            path: "/posts/:post",
            element: <Post />,
            loader: fetchPost,
            handle: { crumb: (data: any) => <span>Post {data.postId}</span> }
          }
        ]
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
