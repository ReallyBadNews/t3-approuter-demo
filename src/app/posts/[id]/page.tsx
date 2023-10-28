import { TRPCError } from "@trpc/server";
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
    <div>
      <h1>{post?.name}</h1>
    </div>
  );
}
