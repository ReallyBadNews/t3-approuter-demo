"use client"; // Error components must be Client Components

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
    <div className="container">
      <h2>Something went wrong!</h2>
      {error.digest && (
        <>
          <p>
            Error ID: <code>{error.digest}</code>
          </p>
          <p>{error.message}</p>
        </>
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
