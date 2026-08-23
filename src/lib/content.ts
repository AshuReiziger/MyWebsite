import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import matter from "gray-matter";

const WORK_DIR = path.join(process.cwd(), "src/content/work");
const THINK_DIR = path.join(process.cwd(), "src/content/think");
const RESOURCES_DIR = path.join(process.cwd(), "src/content/resources");

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
  /** Slug of a resource (src/content/resources) to recommend via ResourceCTA at the end of this article. Opt-in per article — omit for none. */
  relatedResource?: string;
}

export interface ResourceCoverArea {
  title: string;
  description: string;
}

export interface ResourceFrontmatter {
  title: string;
  /** e.g. "Brand & Business", "Design", "Creative Career", "Creative Leadership" — open string set, extensible by just using a new value. */
  category: string;
  /** e.g. "Guide", "Checklist", "Workbook", "Template", "Framework", "Audit". */
  type: string;
  /** Short card/meta description. */
  description: string;
  /** Longer copy for the resource's own landing page. */
  longDescription: string;
  /** Optional preview/mockup image — falls back to the gradient placeholder like Work/Think. */
  coverImage?: string;
  /** Overrides for the landing-page hero; fall back to generated defaults from title/description when omitted. */
  heroHeadline?: string;
  heroSubcopy?: string;
  /** "What this resource covers" beats. */
  covers: ResourceCoverArea[];
  /** "Who it's for" list. */
  audience: string[];
  /** "What you'll get" paragraph. */
  whatYoullGet: string;
  /**
   * Where the actual file lives once submission succeeds — a local /public
   * path or an absolute URL (e.g. Cloudinary, S3, or any secure storage).
   * Deliberately per-resource (frontmatter, not a global env var) since a
   * single global variable can't scale once there's more than one resource.
   */
  downloadFile: string;
  /** Marks the flagship resource used for homepage/Think CTAs when no specific resource is named. */
  featured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface ContentEntry<T> {
  slug: string;
  frontmatter: T;
  content: string;
  /** Unix ms timestamp of this file's last git commit, or its filesystem mtime if it isn't tracked yet (a brand-new file). Drives the most-recently-edited-first ordering everywhere entries are listed. */
  lastEdited: number;
}

/**
 * Most-recent-commit-touching-this-file, not the content's own date/year
 * field — so editing an old entry surfaces it without needing to bump a
 * date by hand.
 *
 * Vercel's default build clone is shallow (depth 10 — see CLAUDE.md), so
 * `git log` finds nothing for a file whose last commit fell outside that
 * window even though the file is genuinely tracked. Falling back to
 * filesystem mtime in that case would be actively wrong: a fresh checkout
 * writes every file at roughly the same instant, so an untouched, actually
 * -old file would get an mtime indistinguishable from "just edited" and
 * wrongly jump to the top. So a tracked-but-log-empty file sorts as
 * oldest (epoch 0) instead — safe (falls to the bottom, doesn't lie) even
 * without deep clone enabled. mtime is only used for a file git doesn't
 * know about at all (brand new, uncommitted, or no git repo present).
 */
function getLastEditedTime(filePath: string): number {
  try {
    const log = execFileSync("git", ["log", "-1", "--format=%ct", "--", filePath], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (log) return Number(log) * 1000;

    const tracked = execFileSync("git", ["ls-files", "--", filePath], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (tracked) return 0;
  } catch {
    // Not a git repo or git unavailable.
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

export function getAllResources(): ContentEntry<ResourceFrontmatter>[] {
  return readEntries<ResourceFrontmatter>(RESOURCES_DIR);
}

export function getResourceBySlug(slug: string): ContentEntry<ResourceFrontmatter> | null {
  return getAllResources().find((entry) => entry.slug === slug) ?? null;
}

export function getFeaturedResource(): ContentEntry<ResourceFrontmatter> | null {
  const resources = getAllResources();
  return resources.find((entry) => entry.frontmatter.featured) ?? resources[0] ?? null;
}
