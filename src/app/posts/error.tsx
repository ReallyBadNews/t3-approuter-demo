"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("[Error]:", error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      {error.digest && (
        <div>
          <p>
            Error ID: <code>{error.digest}</code>
          </p>
          <p>{error.message}</p>
          <Link href="/posts" className="text-blue-500 underline">
            Back to all posts
          </Link>
        </div>
      )}
      <button
        className="rounded bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-700"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
