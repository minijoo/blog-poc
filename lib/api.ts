// prettier-ignore
import fs from 'fs';
import { join } from "path";
import { bundleMDX } from "mdx-bundler";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((slug) => /.+.mdx$/.test(slug));
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const result = await bundleMDX({
    source: fileContents,
    mdxOptions(options: Record<string, any>) {
      return {
        ...options,
        providerImportSource: "@mdx-js/react",
      };
    },
  });

  // const { data, content } = matter(fileContents);
  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "code") {
      items[field] = result.code;
    }
    if (typeof result.frontmatter[field] !== "undefined") {
      items[field] = result.frontmatter[field];
    }
  });

  return items;
}

export async function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => await getPostBySlug(slug, fields))
  );
  // sort posts by date in descending order
  posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
export function getFile(filePath: string) {
  const fullPath = join(postsDirectory, filePath);
  console.log("Full path", fullPath);
  return fs.readFileSync(fullPath, "utf8");
}
