"use client";

import HydrationWrapper from "../utilities/HydrationWrapper";
import {
  NavbarItem,
  Button,
  Avatar,
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";

function AuthContent() {
  const { data: session, status } = useSession();

  const handleSignIn = async () => {
    if (typeof window !== "undefined") {
      await actions.sign_in();
    }
  };

  const handleSignOut = async () => {
    if (typeof window !== "undefined") {
      await actions.sign_out();
    }
  };

  return (
    <HydrationWrapper>
      {status === "loading" ? (
        <NavbarItem>
          <Spinner size="lg" />
        </NavbarItem>
      ) : status === "authenticated" && session?.user ? (
        <NavbarItem>
          <Popover placement="left">
            <PopoverTrigger>
              <Avatar src={session.user.image || ""} className="rounded-full" />
            </PopoverTrigger>
            <PopoverContent>
              <div className="p-4">
                <form action={handleSignOut}>
                  <Button type="submit">Sign Out</Button>
                </form>
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>
      ) : (
        <>
          <NavbarItem>
            <form action={handleSignIn}>
              <Button
                type="submit"
                color="primary"
                variant="bordered"
                aria-label="Sign in to your account"
              >
                Sign In
              </Button>
            </form>
          </NavbarItem>
          <NavbarItem>
            <Button type="submit" color="secondary" variant="bordered">
              Sign Up
            </Button>
          </NavbarItem>
        </>
      )}
    </HydrationWrapper>
  );
}

export default AuthContent;
