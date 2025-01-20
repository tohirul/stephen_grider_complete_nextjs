"use server";

import { database } from "@/database";
import { PostWithRelations } from "@/types/PostType";
import { redirect } from "next/navigation";

export async function search(formData: FormData) {
  const term = formData.get("term");

  if (typeof term !== "string" || !term) {
    redirect("/");
  }
  redirect(`/search?term=${term}`);
}

export async function fetchPostsBySearchTerm(
  term: string
): Promise<PostWithRelations[]> {
  return database.post.findMany({
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    where: {
      OR: [
        {
          title: {
            contains: term,
          },
        },
        {
          content: {
            contains: term,
          },
        },
      ],
    },
  });
}
