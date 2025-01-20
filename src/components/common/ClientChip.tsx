"use client";

import HydrationWrapper from "@/utilities/HydrationWrapper";
import { Chip } from "@nextui-org/react";

export default function ClientChip({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Chip color="warning" variant="shadow">
      {children}
    </Chip>
  );
}
