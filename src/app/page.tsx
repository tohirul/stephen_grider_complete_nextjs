import TopicCreateForm from "@/components/topics/TopicCreateForm";
import "./globals.css";
import TopicsList from "@/components/topics/TopicsList";
import { Divider } from "@nextui-org/react";
import PostList from "@/components/posts/PostList";
import { fetchTopPosts } from "@/database/queries/posts";

export default async function Home() {
  return (
    <div className="gap-4 grid grid-cols-4 p-4">
      {/* Sign In Form */}
      <div className="col-span-3">
        <h2 className="m-2 text-xl">Top Posts</h2>
        <PostList fetchData={fetchTopPosts} />
      </div>
      <div className="shadow px-2 py-3 border">
        <TopicCreateForm />
        <Divider className="my-2" />
        <h3 className="my-2 text-lg">Topics</h3>
        <TopicsList />
      </div>
    </div>
  );
}
