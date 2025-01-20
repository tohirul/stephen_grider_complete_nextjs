"use client";
import React, { useId } from "react";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";
import HydrationWrapper from "../utilities/HydrationWrapper";

function AuthForm() {
  const { status } = useSession();
  const formId = useId();

  if (status === "loading") {
    return (
      <HydrationWrapper>
        <div role="status">Loading...</div>
      </HydrationWrapper>
    );
  }

  return (
    <HydrationWrapper>
      <div>
        {status === "unauthenticated" ? (
          <form
            id={formId}
            onSubmit={async (e) => {
              e.preventDefault();
              await nextAuthSignIn("github", { callbackUrl: "/" });
            }}
          >
            <Button type="submit">Sign In</Button>
          </form>
        ) : (
          <form
            id={formId}
            onSubmit={async (e) => {
              e.preventDefault();
              await nextAuthSignOut();
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        )}
      </div>
    </HydrationWrapper>
  );
}

export default AuthForm;
