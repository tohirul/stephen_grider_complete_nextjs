"use server";
import Link from "next/link";
import paths from "@/paths";
import { decodeSlug } from "@/utilities/decodeSlug";
import PostShow from "@/components/posts/PostShow";
import CommentCreateForm from "@/components/comments/CommentCreateForm";
import CommentList from "@/components/comments/CommentList";
import { fetchCommentsByPostId } from "@/database/queries/comments";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";
import PostSkeleton from "@/components/posts/PostSkeleton";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="space-y-3 py-4">
      <Link
        className="underline decoration-solid"
        href={paths.topicShow(decodeSlug(slug))}
      >
        {"<"} Back to {decodeSlug(slug)}
      </Link>
      <Suspense fallback={<PostSkeleton />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
    </div>
  );
}
