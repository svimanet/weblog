export interface Post {
  postContent: string;
  postId: string;
}

export interface PostsList {
  posts: PostsListEntry[];
  postId: string;
}

// TODO: i18n
export interface PostsListEntry {
  nb: string;
  nn: string;
  en: string;
  date: string;
}