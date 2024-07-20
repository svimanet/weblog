export interface PostsList {
  posts: PostsListEntry[];
  postId: string;
}
export interface PostsListEntry {
  id: string;
  nb: string;
  nn: string;
  en: string;
  date: string;
}
