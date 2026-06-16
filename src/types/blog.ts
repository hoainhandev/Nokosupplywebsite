export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  content: string;
  thumbnail: string | null;
  category: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
}
