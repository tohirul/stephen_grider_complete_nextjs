"use server";

import { z } from "zod";
import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { database } from "@/database";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/actions/getAuthSession";

const createTopicSchema = z.object({
  topic_name: z
    .string()
    .min(3)
    .max(50)
    .regex(/[a-z-]/, { message: "Topic name must be in lowercase" }),
  topic_description: z.string().min(10).max(500),
});

interface CreateTopicFormState {
  errors?: {
    topic_name?: string[];
    topic_description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  data: FormData
): Promise<CreateTopicFormState> {
  // console.log(data);
  const validation = createTopicSchema.safeParse({
    topic_name: data.get("topic_name"),
    topic_description: data.get("topic_description"),
  });
  // add 2 second delay
  if (!validation.success)
    return {
      errors: {
        ...validation.error.flatten().fieldErrors,
        _form: ["Something went wrong"],
      },
    };

  const session = await getAuthSession();
  // console.log(session);
  if (!session?.user)
    return {
      errors: {
        _form: ["You must be logged in to create a topic"],
      },
    };
  let topic: Topic;
  try {
    topic = await database.topic.create({
      data: {
        slug: validation?.data?.topic_name as string,
        description: validation?.data?.topic_description as string,
      },
    });
  } catch (error: unknown) {
    if (error instanceof globalThis.Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
  }
  revalidatePath("/");
  redirect(paths.topicShow(topic.slug));
}
