import { Comment } from "@prisma/client";

export type CommentWithRelations = Comment & {
  user: {
    name: string | null;
    image: string | null;
  };
};

export interface CommentListProps {
  fetchData: () => Promise<CommentWithRelations[]>;
}

export interface CommentShowProps {
  commentId: string;
  comments: CommentWithRelations[];
}

export interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}
