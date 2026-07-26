/** Silent-reading rate for prose. Sits between npm `reading-time` (200) and Medium (~265). */
const WORDS_PER_MINUTE = 220;

/** Code is scanned, not read linearly, so it is costed per line rather than per word. */
const SECONDS_PER_CODE_LINE = 1.5;

const FENCED_CODE = /^[ \t]*(?:```|~~~)[\s\S]*?^[ \t]*(?:```|~~~)[ \t]*$/gm;

/**
 * Rough reading time from the raw md/mdx body. Frontmatter is already stripped
 * by the content loader, but imports, JSX tags and code fences are not.
 *
 * Prose and code are measured separately: counting code as words wildly
 * overstates it, and dropping it (as this used to) understates code-heavy posts.
 */
export function readingTime(body: string | undefined): number {
  if (!body) return 1;

  let codeLines = 0;

  const prose = body
    .replace(FENCED_CODE, (block) => {
      // Discount the two fence lines themselves.
      codeLines += Math.max(0, block.trim().split("\n").length - 2);
      return " ";
    })
    .replace(/^import\s.+$/gm, " ")
    .replace(/<[^>]+>/g, " ");

  const words = prose.split(/\s+/).filter(Boolean).length;
  const minutes = words / WORDS_PER_MINUTE + (codeLines * SECONDS_PER_CODE_LINE) / 60;

  return Math.max(1, Math.round(minutes));
}
