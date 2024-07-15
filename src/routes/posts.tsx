import { ChangeEvent, ReactNode, useState } from "react";
import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import type { Post as PostObj, PostsList } from "../types";
import '../styles/posts.css';

const PostLink = (
  props: {
    i: number,
    date: string,
    title: string,
    to: string,
    selectedPost: boolean;
    setSelectedPost: (post: string) => void;
    setShowingPostsList: (showing: boolean) => void;
}): ReactNode => (
  <li key={`post-${props.i}-list-item`} >
    <Link 
      id={`post-${props.i}-hyperlink`}
      className={props.selectedPost ? 'selected' : ''}
      to={props.to}
      onClick={() => {
        props.setSelectedPost(`${props.i}`);
        props.setShowingPostsList(false);
      }}
    >
      <code>#{props.i}</code>
      <label htmlFor={`post-${props.i}-hyperlink`}>{props.title}</label>
      <span>{props.date}</span>
    </Link>
  </li>
);

export const Posts = () => {
  const loaderdata = useLoaderData() as PostsList;
  const location = useLocation();
  const currentPost = location.pathname.split('/posts/')[1];

  const [selectedPost, setSelectedPost] = useState(currentPost);
  const [showingPostsList, setShowingPostsList] = useState(true);

  if (!loaderdata) {
    return (<h2>Loading...</h2>);
  };

  const anchors: ReactNode[] = loaderdata.posts.map((anchor, i) => {
    const isCurrentPost = selectedPost === `${i+1}`;
    return (
      // TODO i18n
      <PostLink i={i+1}
        date={anchor.date}
        title={anchor.nn}
        to={`/posts/${i+1}`}
        selectedPost={isCurrentPost}
        setSelectedPost={setSelectedPost}
        setShowingPostsList={setShowingPostsList}
      />
    );
  })

  const Header = (): ReactNode => {
    const onClick = () => {
      setShowingPostsList(!showingPostsList);
    };

    return (
      <div className="posts-list-header">
        <h2>Weblog posts</h2>
        <button type={"button"} onClick={() => onClick()}>
          {
            showingPostsList
            ? 'Hide'
            : 'Show'
          }
        </button>
      </div>
    );
  };

  return (
    <div className="posts-list-root">
      {<Header />}
      {
        showingPostsList
        ? <ul className="posts">
            {anchors}
          </ul>
        : null
      }
      <Outlet />
    </div>
  );
};

export const Post = () => {
  const loaderdata = useLoaderData() as PostObj;

  if (!loaderdata) {
    return (<h2>Loading...</h2>);
  };

  return (
    <article>
      <Markdown>{loaderdata.postContent}</Markdown>
    </article>
  );
}
