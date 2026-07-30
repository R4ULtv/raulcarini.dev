import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");
  const sortedPosts = [...posts].sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime() || a.id.localeCompare(b.id),
  );
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    // @astrojs/rss appends a trailing slash by default; opt out to match
    // the site's `trailingSlash: 'never'` config.
    trailingSlash: false,
    items: sortedPosts.map((post) => ({
      ...post.data,
      link: `/blog/${post.id}`,
    })),
  });
}
