"use server";
import type { Topic } from "@prisma/client";
import Link from "next/link";
import paths from "@/paths";
import { PostWithRelations } from "@/types/PostType";

interface PostListProps {
  fetchData: () => Promise<PostWithRelations[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();
  const renderedPosts = posts.map((post) => {
    const topicSlug = (post?.topic as Topic)?.slug;

    if (!topicSlug) {
      throw new Error("Need a slug to link to a post");
    }

    return (
      <div key={post.id} className="p-2 border rounded">
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h3 className="font-bold text-lg">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-gray-400 text-xs">By {post.user.name}</p>
            <p className="text-gray-400 text-xs">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
