"use client";
import React from "react";
import { Skeleton } from "@nextui-org/react";

function CommentListSkeleton() {
  return (
    <div className="mt-2 mb-1 p-4 border rounded">
      <div className="flex justify-start items-center gap-4">
        <Skeleton className="bg-gray-200 mb-2 rounded-full w-8 h-8" />
        <Skeleton className="bg-gray-200 mb-2 rounded-full w-24 h-4" />
      </div>

      <div className="ml-12 animate-pulse">
        <Skeleton className="bg-gray-200 mb-2 rounded w-3/4 h-4" />
        <Skeleton className="bg-gray-200 rounded w-28 h-8" />
      </div>
    </div>
  );
}

export default CommentListSkeleton;
