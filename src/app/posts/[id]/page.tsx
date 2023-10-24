import { api } from "~/trpc/server";

export default async function PostShowPage({
  params,
}: {
  params: { id: string };
}) {
  // validate with zod
  const id = params.id;

  if (typeof id !== "string") {
    throw new Error("Invalid id");
  }

  const post = await api.post.getById.query(Number(id));

  return (
    <div>
      <h1>{post?.name}</h1>
    </div>
  );
}
