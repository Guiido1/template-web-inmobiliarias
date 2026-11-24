import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  fecha: string;
  resumen: string;
};

export function getAllPosts(): PostMeta[] {
  const archivos = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = archivos.map((archivo) => {
    const slug = archivo.replace(/\.mdx$/, "");
    const fuente = fs.readFileSync(path.join(CONTENT_DIR, archivo), "utf8");
    const { data } = matter(fuente);
    return {
      slug,
      title: data.title as string,
      fecha: data.fecha as string,
      resumen: data.resumen as string,
    };
  });

  return posts.sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  const rutaArchivo = path.join(CONTENT_DIR, `${slug}.mdx`);
  const fuente = fs.readFileSync(rutaArchivo, "utf8");
  const { data, content } = matter(fuente);
  return {
    slug,
    title: data.title as string,
    fecha: data.fecha as string,
    resumen: data.resumen as string,
    content,
  };
}
