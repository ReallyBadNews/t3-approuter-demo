import Link from "next/link";
import { api } from "~/trpc/server";
import { DeletePost } from "~/app/_components/delete-post";

export default async function PostsAllPage() {
  const posts = await api.post.getAll.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Posts
        </h1>
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          href="/"
        >
          <h3 className="text-2xl font-bold">Go home →</h3>
        </Link>
        <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative flex items-center justify-between gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            >
              <Link
                href={`/posts/${post.id}`}
                className="absolute inset-0 z-0"
              />
              <h3 className="self-center text-2xl font-bold">{post.name}</h3>
              <DeletePost
                id={post.id}
                className="relative z-10 rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";
