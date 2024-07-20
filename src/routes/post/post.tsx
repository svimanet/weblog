/* eslint-disable @typescript-eslint/no-explicit-any */
import Markdown from "react-markdown";
import { useLoaderData } from "react-router-dom";

export interface PostObj {
  postContent: string;
  postId: string;
}

export const Post = () => {
  const loaderdata = useLoaderData() as PostObj;

  if (!loaderdata) {
    return <h2>Loading...</h2>;
  }

  return (
    <article>
      <Markdown>{loaderdata.postContent}</Markdown>
    </article>
  );
};
