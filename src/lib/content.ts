import fs from "fs";
import path from "path";
import matter from "gray-matter";

const WORK_DIR = path.join(process.cwd(), "src/content/work");
const THINK_DIR = path.join(process.cwd(), "src/content/think");

export interface WorkFrontmatter {
  title: string;
  client: string;
  year: string;
  category: string;
  coverImage?: string;
  /** Additional images, used in order for the index's supporting gallery strip, the case-study beats, and the Design tiles. Falls back to the gradient placeholder wherever no image is supplied. */
  gallery?: string[];
  summary: string;
  challenge: string;
  insight: string;
  strategy: string;
  impact: string;
  tags?: string[];
}

export interface ThinkFrontmatter {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  /** Renders this entry's card with the dark accent treatment, for visual rhythm in the grid. */
  accent?: boolean;
}

export interface ContentEntry<T> {
  slug: string;
  frontmatter: T;
  content: string;
}

function readEntries<T>(dir: string): ContentEntry<T>[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const source = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(source);
      return { slug, frontmatter: data as T, content };
    });
}

export function getAllWork(): ContentEntry<WorkFrontmatter>[] {
  return readEntries<WorkFrontmatter>(WORK_DIR).sort(
    (a, b) => Number(b.frontmatter.year) - Number(a.frontmatter.year)
  );
}

export function getWorkBySlug(slug: string): ContentEntry<WorkFrontmatter> | null {
  return getAllWork().find((entry) => entry.slug === slug) ?? null;
}

export function getAllThink(): ContentEntry<ThinkFrontmatter>[] {
  return readEntries<ThinkFrontmatter>(THINK_DIR).sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getThinkBySlug(slug: string): ContentEntry<ThinkFrontmatter> | null {
  return getAllThink().find((entry) => entry.slug === slug) ?? null;
}
