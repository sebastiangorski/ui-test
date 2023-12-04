export interface BlogPost {
  id: string;
  title: string;
  description: string;
  photo_url: string;
}

export interface BlogPosts {
  blogs: BlogPost[]
  total_blogs: number;
}
