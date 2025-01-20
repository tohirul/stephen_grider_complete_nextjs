"use client";
import { useSession } from "next-auth/react";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import HydrationWrapper from "../utilities/HydrationWrapper";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <HydrationWrapper>
        {" "}
        <div className="flex justify-center items-center">
          <Spinner label="Loading profile..." />
        </div>
      </HydrationWrapper>
    );
  }

  if (status === "authenticated" && session?.user) {
    return (
      <HydrationWrapper>
        {" "}
        <Card className="max-w-md ">
          <CardBody className="flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <div className="space-y-2">
              <p className="text-gray-200">
                <span className="font-semibold">Name:</span> {session.user.name}
              </p>
              <p className="text-gray-200">
                <span className="font-semibold">Email:</span>{" "}
                {session.user.email}
              </p>
            </div>
          </CardBody>
        </Card>
      </HydrationWrapper>
    );
  }

  return (
    <HydrationWrapper>
      {" "}
      <Card>
        <CardBody>
          <p className="text-center">Please sign in to view your profile</p>
        </CardBody>
      </Card>
    </HydrationWrapper>
  );
}
