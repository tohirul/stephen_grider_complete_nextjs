"use client";

import { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { search } from "@/actions";

// import SearchIcon from "@/components/icons/SearchIcon";

export default function SearchBar() {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="bg-gray-800 rounded-lg w-full animate-pulse" />;
  }

  return (
    <form action={search}>
      <Input
        name="term"
        aria-label="Search discussions"
        role="search"
        placeholder="Search..."
        classNames={{
          input: "w-full h-full px-2 text-black",
          inputWrapper: "w-full",
          base: "border rounded-lg",
        }}
        defaultValue={searchParams.get("term") || ""}
      />
    </form>
  );
}
