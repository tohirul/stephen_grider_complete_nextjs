"use server";
import Nav from "./Nav";

export default async function Header() {
  return (
    <div className="w-full flex justify-center">
      <Nav />
    </div>
  );
}
