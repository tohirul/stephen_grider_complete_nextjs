"use client";
import { Suspense } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import NavAuth from "@/components/NavAuth";
import SearchBar from "@/components/SearchBar";
import HydrationWrapper from "../utilities/HydrationWrapper";

export default function Nav() {
  return (
    <Navbar className="flex justify-ceter items-center shadow mb-6 py-4">
      <NavbarBrand>
        <Link href="/" className="font-bold text-lg">
          Discuss
        </Link>
      </NavbarBrand>{" "}
      <NavbarContent className="w-full grow" justify="center">
        <NavbarItem className="w-full">
          <Suspense
            fallback={
              <div className="bg-gray-800 rounded-lg w-full h-full animate-pulse grow" />
            }
          >
            <SearchBar />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Suspense fallback={null}>
          <NavAuth />
        </Suspense>
      </NavbarContent>
    </Navbar>
  );
}
