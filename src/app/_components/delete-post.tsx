"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

interface DeletePostProperties {
  id: number;
  className?: string;
}

export function DeletePost({ id, className }: DeletePostProperties) {
  const router = useRouter();
  const { data, mutateAsync, error, isPending, isSuccess } =
    api.post.delete.useMutation({ onSuccess: () => router.refresh() });

  return (
    <button
      onClick={async () => {
        const response = await mutateAsync({ id });
        console.log("[response]", response);
      }}
      className={className}
    >
      delete
    </button>
  );
}
