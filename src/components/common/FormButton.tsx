"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";
import { type } from "os";
// import HydrationWrapper from "../../utilities/HydrationWrapper";

interface FormButtonProps {
  children: React.ReactNode;
}

export default function FormButton({ children }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      isLoading={pending}
      variant="flat"
      color="success"
      className="font-bold"
    >
      {children}
    </Button>
  );
}
