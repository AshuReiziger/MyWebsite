import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
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
  /** Unix ms timestamp of this file's last git commit, or its filesystem mtime if it isn't tracked yet (a brand-new file). Drives the most-recently-edited-first ordering everywhere entries are listed. */
  lastEdited: number;
}

/** Most-recent-commit-touching-this-file, not the content's own date/year field — so editing an old entry surfaces it without needing to bump a date by hand. Falls back to mtime for untracked files (and works even outside a git repo). */
function getLastEditedTime(filePath: string): number {
  try {
    const output = execFileSync("git", ["log", "-1", "--format=%ct", "--", filePath], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (output) return Number(output) * 1000;
  } catch {
    // Not a git repo, git unavailable, or the file isn't tracked yet.
  }
  return fs.statSync(filePath).mtimeMs;
}

function readEntries<T>(dir: string): ContentEntry<T>[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(dir, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(source);
      return { slug, frontmatter: data as T, content, lastEdited: getLastEditedTime(filePath) };
    })
    .sort((a, b) => b.lastEdited - a.lastEdited);
}

export function getAllWork(): ContentEntry<WorkFrontmatter>[] {
  return readEntries<WorkFrontmatter>(WORK_DIR);
}

export function getWorkBySlug(slug: string): ContentEntry<WorkFrontmatter> | null {
  return getAllWork().find((entry) => entry.slug === slug) ?? null;
}

export function getAllThink(): ContentEntry<ThinkFrontmatter>[] {
  return readEntries<ThinkFrontmatter>(THINK_DIR);
}

export function getThinkBySlug(slug: string): ContentEntry<ThinkFrontmatter> | null {
  return getAllThink().find((entry) => entry.slug === slug) ?? null;
}
