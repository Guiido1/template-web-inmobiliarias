import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <p className="text-sm text-slate-400">{post.fecha}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
        {post.title}
      </h1>
      <div className="prose prose-slate mt-8 max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </main>
  );
}
