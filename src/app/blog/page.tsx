import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Blog
      </h1>
      <p className="mt-2 text-slate-500">
        Contenido sobre inversión inmobiliaria y la zona.
      </p>

      <div className="mt-10 space-y-10">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-xl font-medium text-slate-900 hover:underline"
            >
              {post.title}
            </Link>
            <p className="mt-1 text-sm text-slate-400">{post.fecha}</p>
            <p className="mt-2 text-slate-600">{post.resumen}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
