"use client";

import { memo, useMemo } from "react";
import CommentCreateForm from "@/components/comments/CommentCreateForm";
import Image from "next/image";
import { CommentShowProps } from "@/types/CommentType";
import HydrationWrapper from "@/utilities/HydrationWrapper";

const CommentShow = memo(function CommentShow({
  commentId,
  comments,
}: CommentShowProps) {
  // Memoize comment finding with a stable reference
  const comment = useMemo(
    () => comments.find((c) => c.id === commentId) || null,
    [commentId, comments]
  );

  // Early return if no comment
  if (!comment) return null;

  // Memoize children comments with a stable reference
  const childrenComments = useMemo(
    () => comments.filter((c) => c.parentId === commentId),
    [commentId, comments]
  );

  // Memoize child comments rendering to prevent unnecessary re-renders
  const renderedChildren = useMemo(
    () =>
      childrenComments.map((child) => (
        <CommentShow key={child.id} commentId={child.id} comments={comments} />
      )),
    [childrenComments, comments]
  );

  // Memoize user image rendering
  const userImage = useMemo(
    () => (
      <Image
        src={comment.user.image || "/default-avatar.png"}
        alt={`${comment.user.name}'s avatar`}
        width={40}
        height={40}
        className="rounded-full w-10 h-10"
      />
    ),
    [comment.user.image, comment.user.name]
  );

  return (
    <HydrationWrapper>
      <div className="mt-2 mb-1 p-4 border">
        <div className="flex gap-3">
          {userImage}
          <div className="flex-1 space-y-3">
            <p className="font-medium text-gray-500 text-sm">
              {comment.user.name}
            </p>
            <p className="text-gray-900">{comment.content}</p>

            <CommentCreateForm postId={comment.postId} parentId={comment.id} />
          </div>
        </div>
        <div className="pl-4">{renderedChildren}</div>
      </div>
    </HydrationWrapper>
  );
});

export default memo(CommentShow);
