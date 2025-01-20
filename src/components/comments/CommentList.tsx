"use server";
import { Suspense } from "react";
import CommentShow from "./CommentShow";
import { CommentListProps } from "@/types/CommentType";
import CommentListSkeleton from "./CommentListSkeleton";

export default async function CommentList({ fetchData }: CommentListProps) {
  // add delay to simulate loading time
  const comments = await fetchData();

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );

  const renderedComments = topLevelComments.map((comment) => {
    return (
      <Suspense key={comment.id} fallback={<CommentListSkeleton />}>
        <RenderCommentShow commentId={comment.id} comments={comments} />
      </Suspense>
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="font-bold text-lg">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}

async function RenderCommentShow({
  commentId,
  comments,
}: {
  commentId: string;
  comments: any[];
}) {
  return <CommentShow commentId={commentId} comments={comments} />;
}
