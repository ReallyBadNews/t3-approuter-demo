import { TRPCError } from "@trpc/server";
import Link from "next/link";
import { api } from "~/trpc/server";

export default async function PostShowPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  if (typeof id !== "string") {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid ID" });
  }

  const post = await api.post.getById.query(Number(id));

  if (!post) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="relative flex items-center justify-between gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
          <h1>{post.name}</h1>
        </div>
        <Link
          href="/posts"
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
        >
          Back to all posts →
        </Link>
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";
