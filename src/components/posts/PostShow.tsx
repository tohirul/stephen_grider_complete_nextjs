"use server";
import { database } from "@/database";
import { Post } from "@prisma/client";
import { notFound } from "next/navigation";

interface PostShowProps {
  postId: string;
}

export default async function PostShow({ postId }: PostShowProps) {
  const post: Post | null = await database.post.findFirst({
    where: {
      id: postId,
    },
  });
  if (!post) {
    notFound();
  }
  return (
    <div className="m-4">
      <h1 className="my-2 font-bold text-2xl">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}
