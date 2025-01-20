"use server";

import { Session } from "next-auth";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAuthSession } from "@/actions/getAuthSession";

import { database } from "@/database";
import paths from "@/paths";
import UserData from "@/types/UserType";

const createPostSchema = z.object({
  post_title: z.string().min(3).max(100),
  post_content: z.string().min(10).max(1000),
});

interface CreatePostFormState {
  errors?: {
    post_title?: string[];
    post_content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  data: FormData
): Promise<CreatePostFormState> {
  const validation = createPostSchema.safeParse({
    post_title: data.get("post_title"),
    post_content: data.get("post_content"),
  });
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }
  const session: Session | null = await getAuthSession();
  const user = session?.user as UserData;
  if (!session || !user) {
    return {
      errors: {
        _form: ["You must be logged in to create a post"],
      },
    };
  }
  const topic = await database.topic.findFirst({
    where: {
      slug,
    },
  });
  if (!topic) {
    return {
      errors: {
        _form: ["Topic not found"],
      },
    };
  }

  let post: Post;

  try {
    post = await database.post.create({
      data: {
        title: validation.data.post_title,
        content: validation.data.post_content,
        userId: user?.id as string,
        topicId: topic.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof globalThis.Error) {
      console.error(error);
      return {
        errors: {
          _form: [
            error?.message || "Something went wrong while creating the post",
          ],
        },
      };
    }

    return {
      errors: {
        _form: ["An unexpected error occurred"],
      },
    };
  }
  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post?.id));
}
