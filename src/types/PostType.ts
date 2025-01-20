import { Post } from "@prisma/client";

export type PostWithRelations = Post & {
  user: { name: string | null };
  topic: { slug: string };
  _count: {
    comments: number;
  };
};
