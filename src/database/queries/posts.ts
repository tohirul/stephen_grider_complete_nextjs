import { database } from "@/database";
import { PostWithRelations } from "@/types/PostType";

// export type PostWithData = Awaited<
//   ReturnType<typeof fetchPostsByTopicSlug>
// >[number];

export function fetchPostsByTopicSlug(
  slug: string
): Promise<PostWithRelations[]> {
  return database.post.findMany({
    where: {
      topic: {
        slug,
      },
    },
    include: {
      user: { select: { name: true } },
      topic: { select: { slug: true } },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
}

export function fetchTopPosts(): Promise<PostWithRelations[]> {
  return database.post.findMany({
    orderBy: [
      {
        comments: { _count: "desc" },
      },
    ],
    include: {
      user: { select: { name: true, image: true } },
      topic: { select: { slug: true } },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    take: 5,
  });
}
