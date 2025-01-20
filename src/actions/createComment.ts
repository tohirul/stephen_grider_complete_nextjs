"use server";

import { z } from "zod";
import { getAuthSession } from "./getAuthSession";
import { Session } from "next-auth";
import UserData from "@/types/UserType";
import { database } from "@/database";
import { revalidatePath } from "next/cache";
import paths from "@/paths";

const createCommentSchema = z.object({
  content: z.string().min(3),
});

interface CreateCommentFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function createComment(
  { postId, parentId }: { postId: string; parentId?: string },
  formState: CreateCommentFormState,
  data: FormData
): Promise<CreateCommentFormState> {
  const validation = createCommentSchema.safeParse({
    content: data.get("content"),
  });
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }
  const session: Session | null = await getAuthSession();
  const user: UserData = session?.user as UserData;
  if (!session || !user)
    return {
      errors: {
        _form: ["You must be logged in to comment"],
      },
    };

  try {
    await database.comment.create({
      data: {
        content: validation.data.content,
        postId: postId,
        parentId: parentId,
        userId: user.id,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong..."],
        },
      };
    }
  }

  const topic = await database.topic.findFirst({
    where: { posts: { some: { id: postId } } },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Failed to revalidate topic"],
      },
    };
  }

  revalidatePath(paths.postShow(topic.slug, postId));
  return {
    errors: {},
  };
}
