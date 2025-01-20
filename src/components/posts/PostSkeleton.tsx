"use client";
import { Skeleton } from "@nextui-org/react";
import React from "react";

function PostSkeleton() {
  return (
    <div className="bg-gray-50 shadow-sm m-4 p-4">
      <Skeleton className="my-2 py-4 w-1/3 font-bold text-2xl" />
      <Skeleton className="my-2 py-5 w-1/2 font-bold text-2xl" />
    </div>
  );
}

export default PostSkeleton;
