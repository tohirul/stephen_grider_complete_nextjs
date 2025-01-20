"use server";
import Link from "next/link";
import { database } from "@/database";
import paths from "@/paths";
import ClientChip from "@/components/common/ClientChip";
import HydrationWrapper from "../../utilities/HydrationWrapper";

export default async function TopicsList() {
  const topics = await database.topic.findMany({});
  const renderedTopics = topics.map((topic) => {
    return (
      <div key={topic?.id}>
        <Link href={paths.topicShow(topic?.slug)}>
          <ClientChip>{topic?.slug}</ClientChip>
        </Link>
      </div>
    );
  });
  return <div className="flex flex-row flex-wrap gap-2">{renderedTopics}</div>;
}
