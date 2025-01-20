"use server";
import PostCreateForm from "@/components/posts/PostCreateForm";
import PostList from "@/components/posts/PostList";
import { fetchPostsByTopicSlug } from "@/database/queries/posts";
import { decodeSlug } from "@/utilities/decodeSlug";

interface TopicShowPageProps {
  params: {
    slug: string;
  };
}

async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params;
  return (
    <div className="gap-4 grid grid-cols-4 p-4">
      <div className="col-span-3">
        <h1 className="mb-2 font-bold text-2xl">{decodeSlug(slug)}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(decodeSlug(slug))} />
      </div>
      <div>
        <PostCreateForm slug={decodeSlug(slug)} />
      </div>
    </div>
  );
}

export default TopicShowPage;
