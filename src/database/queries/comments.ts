import type { Comment } from "@prisma/client";
import { database } from "@/database";
import { CommentWithRelations } from "@/types/CommentType";
import { cache } from "react";

export const fetchCommentsByPostId = cache(
  (postId: string): Promise<CommentWithRelations[]> => {
    return database.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
);
