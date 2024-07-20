/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderFunction } from "react-router-dom";
import { PostsList } from "./types";

export const postsListLoader: LoaderFunction<any> = async (
  args: any
): Promise<PostsList> => {
  const postId = args.params.post || "";
  const response = await fetch(`/posts.json`).then((res) => res.json());
  return { posts: response, postId };
};
