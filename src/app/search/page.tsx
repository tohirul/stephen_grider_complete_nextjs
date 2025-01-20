"use server";

import { fetchPostsBySearchTerm } from "@/actions/search";
import PostList from "@/components/posts/PostList";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: Promise<{ term: string }>;
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = await searchParams;
  if (!term) redirect("/");
  return (
    <div>
      <PostList
        fetchData={() => fetchPostsBySearchTerm(decodeURIComponent(term))}
      />
    </div>
  );
}

export default SearchPage;
