"use client";
import Link from "next/link";

export default function Example() {
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Serverless functions
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
