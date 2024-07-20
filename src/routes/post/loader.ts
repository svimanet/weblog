/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderFunction } from "react-router-dom";

export const postLoader: LoaderFunction<any> = async (args): Promise<any> => {
  const postId = args.params.post || "";
  const postContent = await fetch(`/${postId}.md`).then((r) => r.text());
  return { postContent, postId };
};
